import { OptionsInterface } from '@rockts-org/nestjs-common';
import { JwtModuleOptions } from '@nestjs/jwt';

/**
 * JWT module settings interface
 */
export interface JwtSettingsInterface extends OptionsInterface {
  access?: JwtModuleOptions;
  refresh?: JwtModuleOptions;
}