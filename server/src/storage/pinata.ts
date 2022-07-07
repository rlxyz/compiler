import { StorageService, UploadFileReturn } from "./storage";
import Pinata, { PinataClient } from "@pinata/sdk";
import fetch from "node-fetch";
import fs from "fs";
import { logError, logInfo } from "../utils/rollbar";
import { UploadError } from "../utils/error";

export class PinataStorageService implements StorageService {
  pinata: PinataClient;
  constructor() {
    this.pinata = Pinata(
      process.env.PINATA_API_KEY,
      process.env.PINATA_SECRET_KEY
    );
  }

  async Get(fileName: string) {
    try {
      const response = await fetch(
        `https://api.pinata.cloud/data/pinList?metadata[name]=${fileName}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
          },
        }
      );

      const data = await response.json();
      const { count, rows } = data;
      if (count > 0) {
        const { metadata, ipfs_pin_hash } = rows[0];
        const { attributes, name } = metadata["keyvalues"];
        return {
          fileExists: true,
          attributes: JSON.parse(attributes),
          name,
          slug: ipfs_pin_hash,
        };
      } else {
        return {
          fileExists: false,
        };
      }
    } catch (err) {
      logError(fileName, err);
      throw new Error(err);
    }
  }

  async Put({
    tokenId,
    tokenHash,
    attributes,
    fileName,
  }: {
    tokenId: number;
    tokenHash: any;
    attributes: any[];
    fileName: string;
  }): Promise<UploadFileReturn> {
    try {
      const { IpfsHash } = await this.pinata.pinFileToIPFS(
        fs.createReadStream(`images/${tokenId}.png`),
        {
          pinataMetadata: {
            name: fileName,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            keyvalues: {
              tokenHash: tokenHash,
              name: fileName,
              attributes: JSON.stringify(attributes),
            },
          },
        }
      );
      logInfo(
        `Upload - Pinata`,
        `reflection/${tokenId} uploaded to ${IpfsHash}`
      );
      return { upload: IpfsHash };
    } catch (err) {
      const newError = new UploadError(err);
      logError(tokenId, newError);
      return { error: newError };
    }
  }
}
