import { Client } from "minio"
import { Response } from "express"
import { Logger } from "@nestjs/common"
import { BufferedFile } from "./file.model"


export class MinioClientService {
  private readonly client: Client
  private readonly logger: Logger

  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT, 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY
    })
    this.logger = new Logger("MinioStorageService")
  }

  public async download(
    fileName: string,
    username: string,
    response: Response
  ): Promise<void> {
    const fileSize = (
      await this.client.statObject(process.env.MINIO_BUCKET_NAME, username + '/' + fileName)
    ).size

    response.setHeader("Content-Type", "*")
    response.setHeader("Content-Length", fileSize);
    (
      await this.client.getObject(process.env.MINIO_BUCKET_NAME, username + '/' + fileName)).pipe(
      response
    )
  }


  public async upload(files: BufferedFile, username: string): Promise<any> {
    const file: BufferedFile = files[0]
    console.log(file)
    const fileName = file.originalname
    const fileBuffer = file.buffer
    const path = username + "/" + fileName

    let error = false
    await new Promise((resolve) => {
      this.client.putObject(process.env.MINIO_BUCKET_NAME, path, fileBuffer, function(err, res) {
        if (err) {
          console.log(err)
          error =  true
          resolve(1)
        }
        else {
          console.log("Uploaded " + fileName)
          error =  false
          resolve(1)
        }
      })
    })
    return error
  }

  public async getVideosNamesByUsername(username: string) {
    const videosName: string[] = []
    const videos = await this.client.listObjectsV2(process.env.MINIO_BUCKET_NAME, username, true)
    let isEmpty = true

    await new Promise((resolve) => {
      videos.on("data", video => {
        isEmpty = false
        if (video.name.match("^.*\-")){
          videosName.push(video.name.match("(?<=-).*")[0].slice(0, -4))
        }
        resolve(videosName)
      })
      setTimeout(() => {
        if (isEmpty) resolve(0)
      }, 1000)
    })
    videosName.sort((a, b) => {
      if (parseInt(a) - parseInt(b) > 0) return 1
      else return -1
    })

    if (videosName.length == 0) videosName.push("none")
    return JSON.stringify(videosName)
  }
}