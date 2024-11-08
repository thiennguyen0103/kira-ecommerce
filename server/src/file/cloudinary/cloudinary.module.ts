import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: (configService: ConfigService) =>
        cloudinary.config({
          cloud_name: configService.get('file.cloudinaryName'),
          api_key: configService.get('file.cloudinaryApiKey'),
          api_secret: configService.get('file.cloudinaryApiSecret'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class CloudinaryModule {}
