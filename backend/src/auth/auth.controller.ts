import { Body, Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { UsersService } from "../users/users.service"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @HttpCode(200)
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

}
