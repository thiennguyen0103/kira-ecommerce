import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CardController } from './card.controller';
import { CardRepository } from './card.repository';
import { CardService } from './card.service';
import { CardDocument, CardSchema } from './entities/card.entity';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: CardDocument.name,
        schema: CardSchema,
      },
    ]),
    ProductModule,
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService, CardRepository],
})
export class CardModule {}
