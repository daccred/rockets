import { IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  AuditInterface,
  ReferenceId,
  ReferenceIdInterface,
} from '@concepta/ts-core';
import { FederatedInterface } from '@concepta/ts-common';
import { AuditDto, ReferenceIdDto } from '@concepta/nestjs-common';

/**
 * Federated DTO
 */
@Exclude()
export class FederatedDto implements FederatedInterface {
  /**
   * Unique id
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Unique identifier',
  })
  @IsString()
  id: ReferenceId = '';

  /**
   * provider
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'provider of the federated',
  })
  @IsString()
  provider = '';

  /**
   * subject
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'subject of the federated',
  })
  @IsString()
  subject = '';

  /**
   * userId
   */
  @Expose()
  @ApiProperty({
    type: ReferenceIdDto,
    description: 'User data',
  })
  @Type(() => ReferenceIdDto)
  user: ReferenceIdInterface = new ReferenceIdDto();

  /**
   * Audit
   */
  @Expose({ toPlainOnly: true })
  @ApiProperty({
    type: AuditDto,
    description: 'Audit data',
  })
  @Type(() => AuditDto)
  audit!: AuditInterface;
}
