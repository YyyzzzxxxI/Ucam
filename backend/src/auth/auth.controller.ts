import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { UsersService } from "../users/users.service"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "../users/dto/login-user.dto"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {
  }

  @HttpCode(200)
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @HttpCode(200)
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

}
