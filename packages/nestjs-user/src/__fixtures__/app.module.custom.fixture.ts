import { Module } from '@nestjs/common';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { CrudModule } from '@concepta/nestjs-crud';
import { EventModule } from '@concepta/nestjs-event';

import { createUserRepositoryFixture } from './create-user-repository.fixture';
import { UserModule } from '../user.module';
import { UserModuleCustomFixture } from './user.module.custom.fixture';
import { UserLookupCustomService } from './services/user-lookup.custom.service';
import { ormConfig } from './ormconfig.fixture';
import { UserEntityFixture } from './user.entity.fixture';

@Module({
  imports: [
    TypeOrmExtModule.forRoot(ormConfig),
    CrudModule.forRoot({}),
    EventModule.forRoot({}),
    UserModule.forRootAsync({
      imports: [UserModuleCustomFixture],
      inject: [UserLookupCustomService],
      useFactory: async (userLookupService: UserLookupCustomService) => ({
        userLookupService,
      }),
      entities: {
        user: {
          entity: UserEntityFixture,
          repositoryFactory: createUserRepositoryFixture,
        },
      },
    }),
  ],
})
export class AppModuleCustomFixture {}
