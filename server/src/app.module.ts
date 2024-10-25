import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { pojos } from '@automapper/pojos';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app-config';
import databaseConfig from './database/config/database-config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
  }),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UserModule,
    RoleModule,
    CategoryModule,
    ProductModule,
    CardModule,
  ],
})
export class AppModule {}
