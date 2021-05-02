import { Body, Controller, Get, HttpCode, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common"
import { VideosService } from "./videos.service"
import { UploadVideoDto } from "./dto/upload-video.dto"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { BufferedFile } from "../minio-client/file.model"
import { Response } from "express"

@Controller("videos")
export class VideosController {

  constructor(private readonly videosService: VideosService) {
  }

  @HttpCode(200)
  @Post("upload")
  @UseInterceptors(AnyFilesInterceptor())
  async uploadVideo(@UploadedFiles() files: BufferedFile) {
    return this.videosService.uploadVideo(files)
  }

  @Get("download:fileName")
  async downloadVideo(
    @Res() response: Response,
    @Param("fileName") fileName: string
  ) {
    await this.videosService.downloadVideo(fileName, response)
  }

  @HttpCode(200)
  @Post("getVideosNames")
  async getVideosNames(@Body() body: UploadVideoDto) {
    return await this.videosService.getVideosNames(body.username)
  }

}
