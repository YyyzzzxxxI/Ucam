import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AddVideoDto {
  @ApiProperty() @IsNotEmpty()
  userId: string;

  @ApiProperty() @IsNotEmpty()
  videoName: string;

}
