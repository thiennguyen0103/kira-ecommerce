import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';
import { Repository } from 'typeorm';
import { FileResponseDto } from './dto/file-response.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  async uploadFile(file: Express.Multer.File, folder: string) {
    const result: UploadApiResponse | UploadApiErrorResponse =
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

    if (!result?.url) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: {
          file: 'Something went wrong',
        },
      });
    }

    const createdFile = await this.fileRepository.save(
      this.fileRepository.create({
        path: result.url,
      }),
    );
    return this.mapper.map(createdFile, FileEntity, FileResponseDto);
  }
}
