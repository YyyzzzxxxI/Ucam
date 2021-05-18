import { Controller, Get, HttpCode, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { VideosService } from "./videos.service"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { BufferedFile } from "../minio-client/file.model"
import { Response } from "express"
import { AuthGuard } from "@nestjs/passport"
import { GetAuthenticatedUser } from "../users/user.decorator"
import { Users } from "../users/entities/users.entity"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger"

@ApiTags("Videos")
@Controller("videos")
export class VideosController {

  constructor(private readonly videosService: VideosService) {
  }

  @HttpCode(200)
  @UseGuards(AuthGuard("jwt"))
  @Post("upload")
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor())
  async uploadVideo(@UploadedFiles() files: BufferedFile, @GetAuthenticatedUser() user: Users) {
    return this.videosService.uploadVideo(files, user.username)
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("download:fileName")
  async downloadVideo(
    @Res() response: Response,
    @Param("fileName") fileName: string,
    @GetAuthenticatedUser() user: Users
  ) {
    await this.videosService.downloadVideo(fileName, user.username, response)
  }

  @HttpCode(200)
  @UseGuards(AuthGuard("jwt"))
  @Post("getVideosNames")
  @ApiBearerAuth()
  async getVideosNames(@GetAuthenticatedUser() user: Users) {
    return await this.videosService.getVideosNames(user.username)
  }

}
