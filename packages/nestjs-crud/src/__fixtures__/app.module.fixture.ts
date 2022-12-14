import { Module } from '@nestjs/common';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { PhotoModuleFixture } from './photo/photo.module.fixture';
import { default as ormConfig } from './ormconfig.fixture';

@Module({
  imports: [TypeOrmExtModule.forRoot(ormConfig), PhotoModuleFixture.register()],
})
export class AppModuleFixture {}
