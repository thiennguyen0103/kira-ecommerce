import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app-config';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../config/database-config';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { RoleSeedModule } from './role/role-seed.module';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [
    RoleSeedModule,
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
