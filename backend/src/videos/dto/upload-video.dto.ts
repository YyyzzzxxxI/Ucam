import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class UploadVideoDto {
  @ApiProperty() @IsNotEmpty()
  username: string

  @ApiProperty() @IsNotEmpty()
  videoName: string
}
