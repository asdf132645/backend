"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
async function bootstrap() {
    const httpApp = await core_1.NestFactory.create(app_module_1.AppModule);
    httpApp.use(bodyParser.json({ limit: '50mb' }));
    httpApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    const corsOptions = {
        origin: process.env.CORS_ORIGIN.split(','),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    httpApp.enableCors(corsOptions);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api 정의')
        .setDescription('uimd 웹 백엔드 req, res 정의')
        .setVersion('1.0')
        .addTag('your-tag')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(httpApp, config);
    swagger_1.SwaggerModule.setup('api', httpApp, document);
    await httpApp.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map