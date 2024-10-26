import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { CardController } from './card.controller';
import { CardProfile } from './card.profile';
import { CardService } from './card.service';
import { CardEntity } from './entities/card.entity';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([CardEntity, UserEntity, ProductEntity]),
    ProductModule,
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService, CardProfile],
  exports: [CardService],
})
export class CardModule {}
