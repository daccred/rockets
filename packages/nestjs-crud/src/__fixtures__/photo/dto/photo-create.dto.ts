import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PhotoDto } from './photo.dto';

@Exclude()
export class PhotoCreateDto extends PickType(PhotoDto, [
  'name',
  'description',
  'filename',
  'isPublished',
]) {}
