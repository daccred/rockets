import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Provider,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { createSettingsProvider } from '@concepta/nestjs-common';
import { PasswordStorageService } from '@concepta/nestjs-password';
import {
  IssueTokenService,
  IssueTokenServiceInterface,
} from '@concepta/nestjs-authentication';

import {
  AUTH_LOCAL_MODULE_ISSUE_TOKEN_SERVICE_TOKEN,
  AUTH_LOCAL_MODULE_SETTINGS_TOKEN,
  AUTH_LOCAL_MODULE_USER_LOOKUP_SERVICE_TOKEN,
} from './auth-local.constants';

import { AuthLocalOptionsExtrasInterface } from './interfaces/auth-local-options-extras.interface';
import { AuthLocalOptionsInterface } from './interfaces/auth-local-options.interface';
import { AuthLocalSettingsInterface } from './interfaces/auth-local-settings.interface';
import { authLocalDefaultConfig } from './config/auth-local-default.config';
import { AuthLocalController } from './auth-local.controller';

const RAW_OPTIONS_TOKEN = Symbol('__AUTH_LOCAL_MODULE_RAW_OPTIONS_TOKEN__');

export const {
  ConfigurableModuleClass: AuthLocalModuleClass,
  OPTIONS_TYPE: AUTH_LOCAL_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: AUTH_LOCAL_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AuthLocalOptionsInterface>({
  moduleName: 'AuthLocal',
  optionsInjectionToken: RAW_OPTIONS_TOKEN,
})
  .setExtras<AuthLocalOptionsExtrasInterface>(
    { global: false },
    definitionTransform,
  )
  .build();

export type AuthLocalOptions = Omit<typeof AUTH_LOCAL_OPTIONS_TYPE, 'global'>;
export type AuthLocalAsyncOptions = Omit<
  typeof AUTH_LOCAL_ASYNC_OPTIONS_TYPE,
  'global'
>;

function definitionTransform(
  definition: DynamicModule,
  extras: AuthLocalOptionsExtrasInterface,
): DynamicModule {
  const { providers = [] } = definition;
  const { controllers, global = false } = extras;

  return {
    ...definition,
    global,
    imports: createAuthLocalImports(),
    providers: createAuthLocalProviders({ providers }),
    controllers: createAuthLocalControllers({ controllers }),
    exports: [ConfigModule, RAW_OPTIONS_TOKEN, ...createAuthLocalExports()],
  };
}

export function createAuthLocalImports(): DynamicModule['imports'] {
  return [ConfigModule.forFeature(authLocalDefaultConfig)];
}

export function createAuthLocalExports(): string[] {
  return [
    AUTH_LOCAL_MODULE_SETTINGS_TOKEN,
    AUTH_LOCAL_MODULE_USER_LOOKUP_SERVICE_TOKEN,
    AUTH_LOCAL_MODULE_ISSUE_TOKEN_SERVICE_TOKEN,
  ];
}

export function createAuthLocalProviders(options: {
  overrides?: AuthLocalOptions;
  providers?: Provider[];
}): Provider[] {
  return [
    ...(options.providers ?? []),
    IssueTokenService,
    PasswordStorageService,
    createAuthLocalOptionsProvider(options.overrides),
    createAuthLocalIssueTokenServiceProvider(options.overrides),
    createAuthLocalUserLookupServiceProvider(options.overrides),
  ];
}

export function createAuthLocalControllers(
  overrides: Pick<AuthLocalOptions, 'controllers'> = {},
): DynamicModule['controllers'] {
  return overrides?.controllers !== undefined
    ? overrides.controllers
    : [AuthLocalController];
}

export function createAuthLocalOptionsProvider(
  optionsOverrides?: AuthLocalOptions,
): Provider {
  return createSettingsProvider<
    AuthLocalSettingsInterface,
    AuthLocalOptionsInterface
  >({
    settingsToken: AUTH_LOCAL_MODULE_SETTINGS_TOKEN,
    optionsToken: RAW_OPTIONS_TOKEN,
    settingsKey: authLocalDefaultConfig.KEY,
    optionsOverrides,
  });
}

export function createAuthLocalIssueTokenServiceProvider(
  optionsOverrides?: AuthLocalOptions,
): Provider {
  return {
    provide: AUTH_LOCAL_MODULE_ISSUE_TOKEN_SERVICE_TOKEN,
    inject: [RAW_OPTIONS_TOKEN, IssueTokenService],
    useFactory: async (
      options: AuthLocalOptionsInterface,
      defaultService: IssueTokenServiceInterface,
    ) =>
      optionsOverrides?.issueTokenService ??
      options.issueTokenService ??
      defaultService,
  };
}

export function createAuthLocalUserLookupServiceProvider(
  optionsOverrides?: AuthLocalOptions,
): Provider {
  return {
    provide: AUTH_LOCAL_MODULE_USER_LOOKUP_SERVICE_TOKEN,
    inject: [RAW_OPTIONS_TOKEN],
    useFactory: async (options: AuthLocalOptionsInterface) =>
      optionsOverrides?.userLookupService ?? options.userLookupService,
  };
}
