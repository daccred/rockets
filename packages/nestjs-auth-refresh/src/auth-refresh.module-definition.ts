import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Provider,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { createSettingsProvider } from '@concepta/nestjs-common';
import {
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

import { AuthRefreshOptionsInterface } from './interfaces/auth-refresh-options.interface';
import { AuthRefreshOptionsExtrasInterface } from './interfaces/auth-refresh-options-extras.interface';
import { AuthRefreshSettingsInterface } from './interfaces/auth-refresh-settings.interface';
import { AuthRefreshController } from './auth-refresh.controller';
import { authRefreshDefaultConfig } from './config/auth-refresh-default.config';

const RAW_OPTIONS_TOKEN = Symbol('__AUTH_REFRESH_MODULE_RAW_OPTIONS_TOKEN__');

export const {
  ConfigurableModuleClass: AuthRefreshModuleClass,
  OPTIONS_TYPE: AUTH_REFRESH_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: AUTH_REFRESH_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AuthRefreshOptionsInterface>({
  moduleName: 'AuthRefresh',
  optionsInjectionToken: RAW_OPTIONS_TOKEN,
})
  .setExtras<AuthRefreshOptionsExtrasInterface>(
    { global: false },
    definitionTransform,
  )
  .build();

export type AuthRefreshOptions = Omit<
  typeof AUTH_REFRESH_OPTIONS_TYPE,
  'global'
>;
export type AuthRefreshAsyncOptions = Omit<
  typeof AUTH_REFRESH_ASYNC_OPTIONS_TYPE,
  'global'
>;

function definitionTransform(
  definition: DynamicModule,
  extras: AuthRefreshOptionsExtrasInterface,
): DynamicModule {
  const { providers = [] } = definition;
  const { controllers, global = false } = extras;

  return {
    ...definition,
    global,
    imports: createAuthRefreshImports(),
    providers: createAuthRefreshProviders({ providers }),
    controllers: createAuthRefreshControllers({ controllers }),
    exports: [ConfigModule, RAW_OPTIONS_TOKEN, ...createAuthRefreshExports()],
  };
}

export function createAuthRefreshImports(): DynamicModule['imports'] {
  return [ConfigModule.forFeature(authRefreshDefaultConfig)];
}

export function createAuthRefreshExports(): string[] {
  return [
    AUTH_REFRESH_MODULE_SETTINGS_TOKEN,
    AUTH_REFRESH_MODULE_USER_LOOKUP_SERVICE_TOKEN,
    AUTH_REFRESH_MODULE_VERIFY_SERVICE_TOKEN,
    AUTH_REFRESH_MODULE_ISSUE_SERVICE_TOKEN,
  ];
}

export function createAuthRefreshProviders(options: {
  overrides?: AuthRefreshOptions;
  providers?: Provider[];
}): Provider[] {
  return [
    ...(options.providers ?? []),
    IssueTokenService,
    createAuthRefreshOptionsProvider(options.overrides),
    createAuthRefreshVerifyTokenServiceProvider(options.overrides),
    createAuthRefreshIssueTokenServiceProvider(options.overrides),
    createAuthRefreshUserLookupServiceProvider(options.overrides),
  ];
}

export function createAuthRefreshControllers(
  overrides: Pick<AuthRefreshOptions, 'controllers'> = {},
): DynamicModule['controllers'] {
  return overrides?.controllers !== undefined
    ? overrides.controllers
    : [AuthRefreshController];
}

export function createAuthRefreshOptionsProvider(
  optionsOverrides?: AuthRefreshOptions,
): Provider {
  return createSettingsProvider<
    AuthRefreshSettingsInterface,
    AuthRefreshOptionsInterface
  >({
    settingsToken: AUTH_REFRESH_MODULE_SETTINGS_TOKEN,
    optionsToken: RAW_OPTIONS_TOKEN,
    settingsKey: authRefreshDefaultConfig.KEY,
    optionsOverrides,
  });
}

export function createAuthRefreshVerifyTokenServiceProvider(
  optionsOverrides?: AuthRefreshOptions,
): Provider {
  return {
    provide: AUTH_REFRESH_MODULE_VERIFY_SERVICE_TOKEN,
    inject: [RAW_OPTIONS_TOKEN, VerifyTokenService],
    useFactory: async (
      options: AuthRefreshOptions,
      defaultService: VerifyTokenServiceInterface,
    ) =>
      optionsOverrides?.verifyTokenService ??
      options.verifyTokenService ??
      defaultService,
  };
}

export function createAuthRefreshIssueTokenServiceProvider(
  optionsOverrides?: AuthRefreshOptions,
): Provider {
  return {
    provide: AUTH_REFRESH_MODULE_ISSUE_SERVICE_TOKEN,
    inject: [RAW_OPTIONS_TOKEN, IssueTokenService],
    useFactory: async (
      options: AuthRefreshOptionsInterface,
      defaultService: IssueTokenServiceInterface,
    ) =>
      optionsOverrides?.issueTokenService ??
      options.issueTokenService ??
      defaultService,
  };
}

export function createAuthRefreshUserLookupServiceProvider(
  optionsOverrides?: AuthRefreshOptions,
): Provider {
  return {
    provide: AUTH_REFRESH_MODULE_USER_LOOKUP_SERVICE_TOKEN,
    inject: [RAW_OPTIONS_TOKEN],
    useFactory: async (options: AuthRefreshOptionsInterface) =>
      optionsOverrides?.userLookupService ?? options.userLookupService,
  };
}
