import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FileEntity } from './entities/file.entity';
import { FileController } from './file.controller';
import { FileProfile } from './file.profile';
import { FileService } from './file.service';

@Module({
  imports: [DatabaseModule.forFeature([FileEntity]), CloudinaryModule],
  controllers: [FileController],
  providers: [FileService, FileProfile],
})
export class FileModule {}
