import { IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AuditInterface, ReferenceIdInterface } from '@concepta/ts-core';
import { AuditDto, ReferenceIdDto } from '@concepta/nestjs-common';
import { CrudResponseDto } from '@concepta/nestjs-crud';
import { OtpInterface } from '@concepta/ts-common';

/**
 * Otp DTO
 */
@Exclude()
export class OtpDto
  extends CrudResponseDto<OtpInterface>
  implements OtpInterface
{
  /**
   * category
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'category of the otp',
  })
  @IsString()
  category = '';

  /**
   * type
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'type of the otp',
  })
  @IsString()
  type = '';

  /**
   * Passcode
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'passcode of the otp',
  })
  @IsString()
  passcode = '';

  /**
   * expirationDate
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'expirationDate of the otp',
  })
  @IsString()
  expirationDate = new Date();

  /**
   * Assignee
   */
  @Expose()
  @ApiProperty({
    type: ReferenceIdDto,
    description: 'assignee data',
  })
  @Type(() => ReferenceIdDto)
  assignee: ReferenceIdInterface = new ReferenceIdDto();

  /**
   * Audit
   */
  @Expose({ toPlainOnly: true })
  @ApiProperty({
    type: AuditDto,
    description: 'Audit data',
  })
  @Type(() => AuditDto)
  audit?: AuditInterface = new AuditDto();
}