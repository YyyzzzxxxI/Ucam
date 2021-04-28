import { Body, Controller, Get, HttpCode, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { AddVideoDto } from "./dto/add-video.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { BufferedFile } from "../minio-client/file.model";
import { Response } from "express";

@Controller("videos")
export class VideosController {

  constructor(private readonly videosService: VideosService) {
  }

  @HttpCode(200)
  @Post("add")
  @UseInterceptors(AnyFilesInterceptor())
  async addVideo(@Body() addVideoDto: AddVideoDto, @UploadedFiles() files: BufferedFile) {
    return this.videosService.addVideo(addVideoDto, files);
  }

  @Get("download:fileName")
  async downloadVideo(
    @Res() response: Response,
    @Param("fileName") fileName: string
  ) {
    await this.videosService.downloadVideo(fileName, response);
  }

}
