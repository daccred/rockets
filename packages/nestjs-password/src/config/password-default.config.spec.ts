import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { PasswordOptionsInterface } from '../interfaces/password-options.interface';
import { PASSWORD_MODULE_OPTIONS_TOKEN } from '../password.constants';
import { passwordDefaultConfig } from './password-default.config';

describe('password configuration', () => {
  let envOriginal: NodeJS.ProcessEnv;

  beforeEach(async () => {
    envOriginal = process.env;
  });

  afterEach(async () => {
    process.env = envOriginal;
    jest.clearAllMocks();
  });

  describe('options token', () => {
    it('should be defined', async () => {
      expect(PASSWORD_MODULE_OPTIONS_TOKEN).toEqual(
        'PASSWORD_MODULE_OPTIONS_TOKEN',
      );
    });
  });

  describe('passwordConfig()', () => {
    let moduleRef: TestingModule;

    it('should use fallbacks', async () => {
      moduleRef = await Test.createTestingModule({
        imports: [ConfigModule.forFeature(passwordDefaultConfig)],
        providers: [],
      }).compile();

      const config: PasswordOptionsInterface =
        moduleRef.get<PasswordOptionsInterface>(passwordDefaultConfig.KEY);

      expect(config).toMatchObject({
        maxPasswordAttempts: 3,
        minPasswordStrength: 8,
      });
    });

    describe('passwordConfig', () => {
      it('config', async () => {
        const config = await passwordDefaultConfig();

        expect(config.maxPasswordAttempts).toBe(3);
        expect(config.minPasswordStrength).toBe(8);
      });

      it('configProcessNotNull', async () => {
        process.env.PASSWORD_MAX_PASSWORD_ATTEMPTS = '1';
        process.env.PASSWORD_MIN_PASSWORD_STRENGTH = '2';

        moduleRef = await Test.createTestingModule({
          imports: [ConfigModule.forFeature(passwordDefaultConfig)],
          providers: [],
        }).compile();

        const config: PasswordOptionsInterface =
          moduleRef.get<PasswordOptionsInterface>(passwordDefaultConfig.KEY);

        expect(config).toMatchObject({
          maxPasswordAttempts: 1,
          minPasswordStrength: 2,
        });
      });

      it('configProcessNull', async () => {
        process.env.PASSWORD_MAX_PASSWORD_ATTEMPTS = 'test';
        process.env.PASSWORD_MIN_PASSWORD_STRENGTH = 'test';

        moduleRef = await Test.createTestingModule({
          imports: [ConfigModule.forFeature(passwordDefaultConfig)],
          providers: [],
        }).compile();

        const config: PasswordOptionsInterface =
          moduleRef.get<PasswordOptionsInterface>(passwordDefaultConfig.KEY);

        expect(config).toMatchObject({
          maxPasswordAttempts: NaN,
          minPasswordStrength: NaN,
        });
      });

      it('configProcessNull', async () => {
        delete process.env.PASSWORD_MAX_PASSWORD_ATTEMPTS;
        delete process.env.PASSWORD_MIN_PASSWORD_STRENGTH;

        moduleRef = await Test.createTestingModule({
          imports: [ConfigModule.forFeature(passwordDefaultConfig)],
          providers: [],
        }).compile();

        const config: PasswordOptionsInterface =
          moduleRef.get<PasswordOptionsInterface>(passwordDefaultConfig.KEY);

        expect(config).toMatchObject({
          maxPasswordAttempts: 3,
          minPasswordStrength: 8,
        });
      });
    });
  });
});
