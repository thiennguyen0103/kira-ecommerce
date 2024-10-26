import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(model: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(model);
  }
}
