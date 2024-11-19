import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as multerS3 from 'multer-s3';
import multer, { MulterError } from 'multer';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { EnvService } from '@env/services/env.service';
import { ENVIRONMENT_KEY } from '@env/variables';

config();
const env = new EnvService(new ConfigService());

export class MulterBuilder {
  protected s3: S3Client;
  protected bucketRegion: string;
  protected bucketName: string;
  protected storage: multer.StorageEngine;
  protected limits: any;
  protected fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: any,
  ) => void;

  constructor() {
    this.bucketRegion = env.get<string>(ENVIRONMENT_KEY.S3_BUCKET_REGION);
    this.bucketName = env.get<string>(ENVIRONMENT_KEY.S3_BUCKET_NAME);
    this.s3 = new S3Client({
      region: this.bucketRegion,
      credentials: {
        accessKeyId: env.get<string>(ENVIRONMENT_KEY.S3_ACCESS_KEY),
        secretAccessKey: env.get<string>(ENVIRONMENT_KEY.S3_SECRET_KEY),
      },
    });
  }

  setStorage(path: string): this {
    this.storage = multerS3({
      s3: this.s3 as S3Client,
      bucket: this.bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: any, key?: string) => void,
      ) => {
        const ext = file.originalname.split('.').pop().toLowerCase();
        const key = `${path}/${uuidv4()}.${ext}`;
        return callback(null, encodeURI(key));
      },
    });
    return this;
  }

  setLimits(limits: any): this {
    this.limits = limits;
    return this;
  }

  setFileFilter(kind: string[]): this {
    this.fileFilter = (req: Request, file: any, callback: any) => {
      const mimeTypes = kind.find((im) => im === file.mimetype);
      if (!mimeTypes) {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE'), false);
      }
      callback(null, true);
    };
    return this;
  }

  build(): multer.Options {
    return {
      storage: this.storage,
      limits: this.limits,
      fileFilter: this.fileFilter,
    };
  }
}
