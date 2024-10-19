import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app-config';
import databaseConfig from './database/config/database-config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
