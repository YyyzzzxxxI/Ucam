import { Client } from "minio";
import { Response } from "express";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BufferedFile } from "./file.model";

export class MinioClientService {
  private readonly client: Client;
  private readonly logger: Logger;

  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT, 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY
    });
    this.logger = new Logger("MinioStorageService");
  }

  public async download(
    fileName: string,
    response: Response
  ): Promise<void> {
    const fileSize = (
      await this.client.statObject(process.env.MINIO_BUCKET_NAME, fileName)
    ).size;

    response.setHeader("Content-Type", "image/*");
    response.setHeader("Content-Length", fileSize);

    (await this.client.getObject(process.env.MINIO_BUCKET_NAME, fileName)).pipe(
      response
    );
  }


  public async upload(userName: string, files: BufferedFile) {
    const file: BufferedFile = files[0];
    console.log(file);
    const fileName = userName + file.originalname;
    const fileBuffer = file.buffer;
    this.client.putObject(process.env.MINIO_BUCKET_NAME, fileName, fileBuffer, function(err, res) {
      err ? console.log(err) : console.log("Uploaded " + fileName);
    });
  }
}