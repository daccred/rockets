import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenInterface } from '../interfaces/access-token.interface';
import { AuthenticationServiceInterface } from '../interfaces/authentication-service.interface';
import { AuthenticationStrategyLocalInterface } from '../interfaces/authentication-strategy-local.interface';
import { CredentialLookupServiceInterface } from '../interfaces/credential-lookup-service.interface';
import { AuthenticationException } from '../exceptions/authentication.exception';
import { CredentialLookupInterface } from '../interfaces/credential-lookup.interface';
import { PasswordStorageService } from './password-storage.service';
import { CREDENTIAL_LOOKUP_SERVICE_TOKEN } from '../config/authentication.config';
import { AuthenticationResponseInterface } from '../interfaces/authentication-response.interface';

/**
 * Service with functions related to the sign in
 * This should be used to authenticate user a user
 */
// TODO: Delete Custom and its references
@Injectable()
export class CustomAuthenticationService
  implements AuthenticationServiceInterface
{
  /**
   * constructor
   */
  constructor(private passwordStorageService: PasswordStorageService) {}

  /**
   * Get user form an service that implements interface and return if password os validated
   * @param dto
   * @returns
   */
  private async getCredentialsInformation(
    dto: AuthenticationStrategyLocalInterface,
  ): Promise<CredentialLookupInterface> {
    // Get user information with encrypt password and salt
    const credentialsLookup = {} as any;
    //await this.credentialLookupServiceInterface.getUser(dto.username);

    if (!credentialsLookup) throw new AuthenticationException();

    return credentialsLookup;
  }

  /**
   * Check if password is valid
   * @param passwordPlain Password not encrypted
   * @param passwordCrypt Password Encrypted
   * @param salt "Salt to decrypt password"
   * @returns
   */
  private async validatePassword(
    passwordPlain: string,
    passwordCrypt: string,
    salt: string,
  ): Promise<boolean> {
    // validate password
    const isValid = await this.passwordStorageService.validatePassword(
      passwordPlain,
      passwordCrypt,
      salt,
    );

    if (!isValid) throw new AuthenticationException();

    return isValid;
  }

  /**
   * Issue the access token based on credential information
   * @param credentialLookup Object with user information
   * @returns
   */
  private async issueAccessToken(
    credentialLookup: CredentialLookupInterface,
  ): Promise<AuthenticationResponseInterface> {
    // Issue a access token for the authenticated user
    const accessToken = {} as any;
    // await this.credentialLookupServiceInterface.issueAccessToken(
    //   credentialLookup.username,
    // );

    if (!accessToken)
      throw new AuthenticationException('Error on access token.');

    return {
      id: credentialLookup.id,
      username: credentialLookup.username,
      accessToken: accessToken.accessToken,
      expireIn: accessToken.expireIn,
    } as AuthenticationResponseInterface;
  }

  /**
   * Authenticate user and return access token information
   * @param dto
   * @returns Promise<AccessTokenInterface>
   */
  async authenticate(
    dto: AuthenticationStrategyLocalInterface,
  ): Promise<AuthenticationResponseInterface> {
    // Get user information
    const credentialsLookup = await this.getCredentialsInformation(dto);

    // validate password or throw an error and error if not valid
    await this.validatePassword(
      dto.password,
      credentialsLookup.password,
      credentialsLookup.salt,
    );

    // Issue a access token for the authenticated user
    return await this.issueAccessToken(credentialsLookup);
  }

  /**
   * Refresh and return new access token
   * @param dto username and password
   * @returns access token interface
   */
  async refreshAccessToken(accessToken: string): Promise<AccessTokenInterface> {
    return null;
    // return await this.credentialLookupServiceInterface.refreshToken(
    //   accessToken,
    // );
  }
}
