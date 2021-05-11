import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Users } from "./entities/users.entity"

export const GetAuthenticatedUser = createParamDecorator((data, ctx: ExecutionContext): Users => {
  const req = ctx.switchToHttp().getRequest()
  return req.user
})