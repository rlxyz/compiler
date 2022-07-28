import { HeadObjectCommand, HeadObjectCommandInput, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { UploadFileReturn } from '.';
// import { FileNotExistError, UploadError } from '../error';
// import { logError, logInfo } from '../rollbar';
import { StorageService } from './storage';

export class S3StorageService implements StorageService {
  s3: S3;
  constructor(opts: {
    endpoint: string;
    region: string;
    credentials: {
      accessKeyId: string;
      secretAccessKey: string;
    };
  }) {
    this.s3 = new S3(opts);
  }

  Connected = async (): Promise<boolean> => {
    return true;
  };

  Put = async ({
    tokenId,
    tokenHash,
    imageBuffer,
    attributes,
    fileName,
  }: {
    tokenId: number;
    tokenHash: any;
    attributes: any[];
    imageBuffer: Buffer;
    fileName: string;
  }): Promise<UploadFileReturn> => {
    try {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${process.env.S3_FOLDER_NAME}/${fileName}.png`,
        Body: imageBuffer,
        ACL: 'public-read',
        ContentType: 'image/png',
        Metadata: {
          'x-amz-meta-attributes': JSON.stringify(attributes),
          'x-amz-meta-token-hash': tokenHash,
          'x-amz-meta-name': `Reflection #${tokenId}`,
        },
      };
      await this.s3.send(new PutObjectCommand(params));
      // logInfo(`Upload - S3`, `reflection/${tokenId} uploaded to ${params.Bucket}/${params.Key}`);
      return { upload: fileName + '.png' };
    } catch (err) {
      // const newError = new UploadError(err);
      // logError(tokenId, newError);
      return { error: new Error('failed') };
    }
  };

  Get = async (fileName: string) => {
    try {
      const spacesParams: HeadObjectCommandInput = {
        Bucket: process.env.S3_BUCKET,
        Key: `${process.env.S3_FOLDER_NAME}/${fileName}.png`,
      };
      const data = await this.s3.send(new HeadObjectCommand(spacesParams));
      return {
        fileExists: true,
        attributes: JSON.parse(data.Metadata['x-amz-meta-attributes']),
        name: data.Metadata['x-amz-meta-name'],
        hash: data.Metadata['x-amz-meta-token-hash'],
        slug: fileName + '.png',
      };
    } catch (err) {
      // const newError = new FileNotExistError(err.message);
      // logError(newError.name, newError.message);
      return { fileExists: false };
    }
  };
}
