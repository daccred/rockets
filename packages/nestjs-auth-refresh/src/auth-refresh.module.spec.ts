import {
  DynamicModule,
  Inject,
  Injectable,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import {
  JwtIssueService,
  JwtModule,
  JwtSignService,
  JwtVerifyService,
} from '@concepta/nestjs-jwt';
import {
  AuthenticationModule,
  IssueTokenService,
  IssueTokenServiceInterface,
  VerifyTokenService,
  VerifyTokenServiceInterface,
} from '@concepta/nestjs-authentication';

import {
  AUTH_REFRESH_MODULE_ISSUE_SERVICE_TOKEN,
  AUTH_REFRESH_MODULE_SETTINGS_TOKEN,
  AUTH_REFRESH_MODULE_USER_LOOKUP_SERVICE_TOKEN,
  AUTH_REFRESH_MODULE_VERIFY_SERVICE_TOKEN,
} from './auth-refresh.constants';

import { AuthRefreshSettingsInterface } from './interfaces/auth-refresh-settings.interface';
import { AuthRefreshUserLookupServiceInterface } from './interfaces/auth-refresh-user-lookup-service.interface';
import { AuthRefreshModule } from './auth-refresh.module';

import { UserLookupServiceFixture } from './__fixtures__/user/user-lookup.service.fixture';
import { UserModuleFixture } from './__fixtures__/user/user.module.fixture';

describe(AuthRefreshModule, () => {
  const jwtAccessService = new NestJwtService();
  const jwtRefreshService = new NestJwtService();
  const jwtSignService = new JwtSignService(
    jwtAccessService,
    jwtRefreshService,
  );
  const jwtVerifyService = new JwtVerifyService(jwtSignService);
  const jwtIssueService = new JwtIssueService(jwtSignService);

  let testModule: TestingModule;
  let authRefreshModule: AuthRefreshModule;
  let userLookupService: AuthRefreshUserLookupServiceInterface;
  let issueTokenService: IssueTokenServiceInterface;
  let verifyTokenService: VerifyTokenServiceInterface;

  describe(AuthRefreshModule.forRoot, () => {
    beforeEach(async () => {
      testModule = await Test.createTestingModule(
        testModuleFactory([
          AuthRefreshModule.forRoot({
            verifyTokenService: new VerifyTokenService(jwtVerifyService),
            issueTokenService: new IssueTokenService(jwtIssueService),
            userLookupService: new UserLookupServiceFixture(),
          }),
        ]),
      ).compile();
    });

    it('module should be loaded', async () => {
      commonVars(testModule);
      commonTests();
    });
  });

  describe(AuthRefreshModule.register, () => {
    beforeEach(async () => {
      testModule = await Test.createTestingModule(
        testModuleFactory([
          AuthRefreshModule.register({
            verifyTokenService: new VerifyTokenService(jwtVerifyService),
            issueTokenService: new IssueTokenService(jwtIssueService),
            userLookupService: new UserLookupServiceFixture(),
          }),
        ]),
      ).compile();
    });

    it('module should be loaded', async () => {
      commonVars(testModule);
      commonTests();
    });
  });

  describe(AuthRefreshModule.forRootAsync, () => {
    beforeEach(async () => {
      testModule = await Test.createTestingModule(
        testModuleFactory([
          AuthRefreshModule.forRootAsync({
            inject: [
              VerifyTokenService,
              IssueTokenService,
              UserLookupServiceFixture,
            ],
            useFactory: (
              verifyTokenService: VerifyTokenService,
              issueTokenService: IssueTokenServiceInterface,
              userLookupService: AuthRefreshUserLookupServiceInterface,
            ) => ({ verifyTokenService, issueTokenService, userLookupService }),
          }),
        ]),
      ).compile();
    });

    it('module should be loaded', async () => {
      commonVars(testModule);
      commonTests();
    });
  });

  describe(AuthRefreshModule.registerAsync, () => {
    beforeEach(async () => {
      testModule = await Test.createTestingModule(
        testModuleFactory([
          AuthRefreshModule.registerAsync({
            inject: [
              VerifyTokenService,
              IssueTokenService,
              UserLookupServiceFixture,
            ],
            useFactory: (
              verifyTokenService: VerifyTokenService,
              issueTokenService: IssueTokenService,
              userLookupService: AuthRefreshUserLookupServiceInterface,
            ) => ({ verifyTokenService, issueTokenService, userLookupService }),
          }),
        ]),
      ).compile();
    });

    it('module should be loaded', async () => {
      commonVars(testModule);
      commonTests();
    });
  });

  describe(AuthRefreshModule.forFeature, () => {
    @Module({})
    class GlobalModule {}

    @Module({})
    class ForFeatureModule {}

    @Injectable()
    class TestService {
      constructor(
        @Inject(AUTH_REFRESH_MODULE_SETTINGS_TOKEN)
        public settings: AuthRefreshSettingsInterface,
        @Inject(AUTH_REFRESH_MODULE_USER_LOOKUP_SERVICE_TOKEN)
        public userLookupService: AuthRefreshUserLookupServiceInterface,
        @Inject(AUTH_REFRESH_MODULE_VERIFY_SERVICE_TOKEN)
        public verifyTokenService: VerifyTokenServiceInterface,
        @Inject(AUTH_REFRESH_MODULE_ISSUE_SERVICE_TOKEN)
        public issueTokenService: IssueTokenServiceInterface,
      ) {}
    }

    let testService: TestService;
    const ffUserLookupService = new UserLookupServiceFixture();
    const ffVerifyTokenService = new VerifyTokenService(jwtVerifyService);
    const ffIssueTokenService = new IssueTokenService(jwtIssueService);

    beforeEach(async () => {
      const globalModule = testModuleFactory([
        AuthRefreshModule.forRootAsync({
          inject: [
            VerifyTokenService,
            IssueTokenService,
            UserLookupServiceFixture,
          ],
          useFactory: (
            verifyTokenService: VerifyTokenService,
            issueTokenService: IssueTokenService,
            userLookupService: UserLookupServiceFixture,
          ) => ({ verifyTokenService, issueTokenService, userLookupService }),
        }),
      ]);

      testModule = await Test.createTestingModule({
        imports: [
          { module: GlobalModule, ...globalModule },
          {
            module: ForFeatureModule,
            imports: [
              AuthRefreshModule.forFeature({
                issueTokenService: ffIssueTokenService,
                verifyTokenService: ffVerifyTokenService,
                userLookupService: ffUserLookupService,
              }),
            ],
            providers: [TestService],
          },
        ],
      }).compile();

      testService = testModule.get(TestService);
    });

    it('module should be loaded', async () => {
      commonVars(testModule);
      commonTests();
    });

    it('should have custom providers', async () => {
      commonVars(testModule);
      expect(testService.userLookupService).toBe(ffUserLookupService);
      expect(testService.userLookupService).not.toBe(userLookupService);
      expect(testService.verifyTokenService).toBe(ffVerifyTokenService);
      expect(testService.verifyTokenService).not.toBe(verifyTokenService);
      expect(testService.issueTokenService).toBe(ffIssueTokenService);
      expect(testService.issueTokenService).not.toBe(issueTokenService);
    });
  });

  function commonVars(module: TestingModule) {
    authRefreshModule = module.get(AuthRefreshModule);
    userLookupService = module.get(UserLookupServiceFixture);
    verifyTokenService = module.get(VerifyTokenService);
    issueTokenService = module.get(IssueTokenService);
  }

  function commonTests() {
    expect(authRefreshModule).toBeInstanceOf(AuthRefreshModule);
    expect(userLookupService).toBeInstanceOf(UserLookupServiceFixture);
    expect(issueTokenService).toBeInstanceOf(IssueTokenService);
    expect(verifyTokenService).toBeInstanceOf(VerifyTokenService);
  }
});

function testModuleFactory(
  extraImports: DynamicModule['imports'] = [],
): ModuleMetadata {
  return {
    imports: [
      UserModuleFixture,
      AuthenticationModule.forRoot({}),
      JwtModule.forRoot({}),
      ...extraImports,
    ],
  };
}
