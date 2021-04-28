import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Videos } from "./entities/videos.entity";
import { AddVideoDto } from "./dto/add-video.dto";
import { MinioClientService } from "../minio-client/minio-client.service";
import { BufferedFile } from "../minio-client/file.model";



@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Videos) private readonly videosRepository: Repository<Videos>,
    @Inject(MinioClientService) private readonly minioClientService: MinioClientService
  ) {
  }

  async addVideo(addVideoDto: AddVideoDto, files: BufferedFile) {
    try {
      //const video = await this.videosRepository.create(addVideoDto)
      //await this.videosRepository.save(video)
      //await this.minioClientService.upload(files)
      await this.minioClientService.upload("testName", files)

    } catch (e) {
      console.log(e)
      return {
        message: "error"
      }
    }
  }

  async downloadVideo(fileName: string, response){
    await this.minioClientService.download(fileName, response)
  }
}
