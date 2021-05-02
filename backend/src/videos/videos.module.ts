import { Module } from "@nestjs/common"
import { VideosController } from "./videos.controller"
import { VideosService } from "./videos.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Videos } from "./entities/videos.entity"
import { MinioClientModule } from "../minio-client/minio-client.module"

@Module({
  imports: [TypeOrmModule.forFeature([Videos]), MinioClientModule],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {
}
