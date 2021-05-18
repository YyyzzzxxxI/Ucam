import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")

  const config = new DocumentBuilder()
    .setTitle("Ucam backend")
    .setDescription("The Ucam API")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/swagger", app, document)

  await app.listen(3000)
}

bootstrap()
