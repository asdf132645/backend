// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { CombinedService } from "./combinedProtocol/combined.service";
import { CombinedModule } from "./combinedProtocol/combined.module";

async function bootstrap() {
  // 먼저 HTTP 서버를 생성합니다.
  const httpApp = await NestFactory.create(AppModule);

  // CORS 에러 이슈로 프론트 8080 허용
  const corsOptions: CorsOptions = {
    origin: "http://localhost:8080", // 허용할 도메인
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  };

  httpApp.enableCors(corsOptions);

  await httpApp.listen(3002);

  const protocolApp =
    await NestFactory.createApplicationContext(CombinedModule);
  const combinedService = protocolApp.get(CombinedService);


}

bootstrap();
