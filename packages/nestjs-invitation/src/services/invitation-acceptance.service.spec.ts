import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { OtpInterface, UserInterface } from '@concepta/ts-common';
import { UserEntityInterface } from '@concepta/nestjs-user';
import { OtpService } from '@concepta/nestjs-otp';
import { UserFactory } from '@concepta/nestjs-user/src/seeding';
import { SeedingSource } from '@concepta/typeorm-seeding';
import { EmailService } from '@concepta/nestjs-email';
import { EventDispatchService } from '@concepta/nestjs-event';

import { InvitationSettingsInterface } from '../interfaces/invitation-settings.interface';
import { INVITATION_MODULE_SETTINGS_TOKEN } from '../invitation.constants';
import { InvitationAppModuleFixture } from '../__fixtures__/invitation.app.module.fixture';
import { UserEntityFixture } from '../__fixtures__/entities/user.entity.fixture';
import { InvitationFactory } from '../invitation.factory';
import { InvitationEntityFixture } from '../__fixtures__/entities/invitation.entity.fixture';
import { InvitationEntityInterface } from '../interfaces/invitation.entity.interface';
import { InvitationAcceptanceService } from './invitation-acceptance.service';

describe(InvitationAcceptanceService, () => {
  const category = 'invitation';

  let spyEmailService: jest.SpyInstance;
  let spyEventDispatchService: jest.SpyInstance;

  let app: INestApplication;
  let seedingSource: SeedingSource;
  let otpService: OtpService;
  let invitationAcceptanceService: InvitationAcceptanceService;
  let settings: InvitationSettingsInterface;

  let testUser: UserEntityInterface;
  let testInvitation: InvitationEntityInterface;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [InvitationAppModuleFixture],
    }).compile();
    app = testingModule.createNestApplication();
    await app.init();

    invitationAcceptanceService =
      testingModule.get<InvitationAcceptanceService>(
        InvitationAcceptanceService,
      );

    otpService = testingModule.get<OtpService>(OtpService);

    settings = testingModule.get<InvitationSettingsInterface>(
      INVITATION_MODULE_SETTINGS_TOKEN,
    );

    spyEmailService = jest.spyOn(EmailService.prototype, 'sendMail');
    spyEventDispatchService = jest.spyOn(
      EventDispatchService.prototype,
      'async',
    );

    seedingSource = new SeedingSource({
      dataSource: testingModule.get(getDataSourceToken()),
    });

    const userFactory = new UserFactory({
      entity: UserEntityFixture,
      seedingSource,
    });

    const invitationFactory = new InvitationFactory({
      entity: InvitationEntityFixture,
      seedingSource,
    });

    testUser = await userFactory.create();
    testInvitation = await invitationFactory.create({
      user: testUser,
      category,
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    return app ? await app.close() : undefined;
  });

  it('Validate passcode', async () => {
    const otp = await createOtp(settings, otpService, testUser, category);

    const validOtp = await invitationAcceptanceService.validatePasscode(
      otp.passcode,
      category,
    );
    expect(validOtp?.assignee).toEqual(testUser);
  });

  it('Validate passcode (invalid)', async () => {
    const invalidOtp = await invitationAcceptanceService.validatePasscode(
      'FAKE_PASSCODE',
      category,
    );

    expect(invalidOtp).toBeNull();
  });

  it('Accept invite and update password', async () => {
    const otp = await createOtp(settings, otpService, testUser, category);

    const inviteAccepted = await invitationAcceptanceService.accept(
      testInvitation,
      otp.passcode,
      { userId: otp.assignee.id, newPassword: 'hOdv2A2h%' },
    );

    expect(spyEmailService).toHaveBeenCalledTimes(1);
    expect(spyEventDispatchService).toHaveBeenCalledTimes(1);
    expect(inviteAccepted).toEqual(true);
  });

  it('Accept invite and update password (fail)', async () => {
    const inviteAccepted = await invitationAcceptanceService.accept(
      testInvitation,
      'FAKE_PASSCODE',
    );

    expect(spyEmailService).toHaveBeenCalledTimes(0);
    expect(spyEventDispatchService).toHaveBeenCalledTimes(0);
    expect(inviteAccepted).toEqual(false);
  });
});

const createOtp = async (
  settings: InvitationSettingsInterface,
  otpService: OtpService,
  user: UserInterface,
  category: string,
): Promise<OtpInterface> => {
  const { assignment, type, expiresIn } = settings.otp;

  const otp = await otpService.create(assignment, {
    category,
    type,
    expiresIn,
    assignee: {
      id: user.id,
    },
  });

  expect(otp).toBeTruthy();
  expect(otp.passcode).toBeTruthy();
  expect(otp.expirationDate).toBeTruthy();
  expect(otp.category).toEqual(category);
  expect(otp.type).toEqual(type);
  expect(otp.assignee.id).toEqual(user.id);

  return otp;
};
