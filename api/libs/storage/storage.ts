export type UploadFileReturn = { upload: string } | { error: Error };

export abstract class StorageService {
  abstract Connected(): Promise<boolean>;
  abstract Get(fileName: string): Promise<{
    fileExists: boolean;
    slug?: string;
    attributes?: { trait_type: string; value: string }[];
    name?: string;
    tokenHash?: string;
  }>;
  abstract Put(opts: {
    tokenId: number;
    tokenHash: any;
    attributes: { trait_type: string; value: string }[];
    imageBuffer: Buffer;
    fileName: string;
  }): Promise<UploadFileReturn>;
}
