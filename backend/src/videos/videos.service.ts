import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Videos } from "./entities/videos.entity"
import { MinioClientService } from "../minio-client/minio-client.service"
import { BufferedFile } from "../minio-client/file.model"


@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Videos) private readonly videosRepository: Repository<Videos>,
    @Inject(MinioClientService) private readonly minioClientService: MinioClientService
  ) {
  }

  async uploadVideo(files: BufferedFile) {
    try {
      await this.minioClientService.upload(files)
      return { message: "success" }
    } catch (e) {
      console.log(e)
      return {
        error: e
      }
    }
  }

  async downloadVideo(fileName: string, response) {
    await this.minioClientService.download(fileName, response)
  }

  async getVideosNames(username: string) {
    return await this.minioClientService.getVideosNamesByUsername(username)
  }
}
