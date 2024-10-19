import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class DatabaseModule {
  static forFeature(model: ModelDefinition[]) {
    return MongooseModule.forFeature(model);
  }
}
