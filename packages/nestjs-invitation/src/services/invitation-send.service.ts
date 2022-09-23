import { Inject } from '@nestjs/common';
import {
  ReferenceEmailInterface,
  ReferenceIdInterface,
  ReferenceUsernameInterface,
} from '@concepta/ts-core';
import { QueryOptionsInterface } from '@concepta/typeorm-common';

import {
  INVITATION_MODULE_EMAIL_SERVICE_TOKEN,
  INVITATION_MODULE_OTP_SERVICE_TOKEN,
  INVITATION_MODULE_SETTINGS_TOKEN,
  INVITATION_MODULE_USER_LOOKUP_SERVICE_TOKEN,
  INVITATION_MODULE_USER_MUTATE_SERVICE_TOKEN,
} from '../invitation.constants';

import { InvitationOtpServiceInterface } from '../interfaces/invitation-otp.service.interface';
import { InvitationSettingsInterface } from '../interfaces/invitation-settings.interface';
import { InvitationUserLookupServiceInterface } from '../interfaces/invitation-user-lookup.service.interface';
import { InvitationUserMutateServiceInterface } from '../interfaces/invitation-user-mutate.service.interface';
import { InvitationEmailServiceInterface } from '../interfaces/invitation-email.service.interface';
import { InvitationSendMailException } from '../exceptions/invitation-send-mail.exception';

export class InvitationSendService {
  constructor(
    @Inject(INVITATION_MODULE_SETTINGS_TOKEN)
    private readonly settings: InvitationSettingsInterface,
    @Inject(INVITATION_MODULE_EMAIL_SERVICE_TOKEN)
    private readonly emailService: InvitationEmailServiceInterface,
    @Inject(INVITATION_MODULE_OTP_SERVICE_TOKEN)
    private readonly otpService: InvitationOtpServiceInterface,
    @Inject(INVITATION_MODULE_USER_LOOKUP_SERVICE_TOKEN)
    private readonly userLookupService: InvitationUserLookupServiceInterface,
    @Inject(INVITATION_MODULE_USER_MUTATE_SERVICE_TOKEN)
    private readonly userMutateService: InvitationUserMutateServiceInterface,
  ) {}

  async send(
    user: ReferenceIdInterface & ReferenceEmailInterface,
    code: string,
    category: string,
    queryOptions?: QueryOptionsInterface,
  ): Promise<void> {
    const { assignment, type, expiresIn } = this.settings.otp;

    // create an OTP for this invite
    const otp = await this.otpService.create(
      assignment,
      {
        category,
        type,
        expiresIn,
        assignee: {
          id: user.id,
        },
      },
      queryOptions,
    );

    // send the invite email
    await this.sendEmail(user.email, code, otp.passcode, otp.expirationDate);
  }

  async getOrCreateOneUser(
    email: string,
    queryOptions?: QueryOptionsInterface,
  ): Promise<
    ReferenceIdInterface & ReferenceUsernameInterface & ReferenceEmailInterface
  > {
    let user = await this.userLookupService.byEmail(email, queryOptions);

    if (!user) {
      user = await this.userMutateService.create(
        {
          email,
          username: email,
        },
        queryOptions,
      );
    }

    return user;
  }

  protected async sendEmail(
    email: string,
    code: string,
    passcode: string,
    resetTokenExp: Date,
  ): Promise<void> {
    const { from, baseUrl } = this.settings.email;
    const { subject, fileName } = this.settings.email.templates.invitation;

    try {
      await this.emailService.sendMail({
        from,
        subject,
        to: email,
        template: fileName,
        context: {
          tokenUrl: `${baseUrl}/?code=${code}&passcode=${passcode}`,
          tokenExp: resetTokenExp,
        },
      });
    } catch (e: unknown) {
      throw new InvitationSendMailException(e, email);
    }
  }
}