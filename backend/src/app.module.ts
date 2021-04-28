import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideosModule } from './videos/videos.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    VideosModule,
    MinioClientModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
