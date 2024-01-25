import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const res: any = exception.getResponse();
    const url: string = request.url;
    const error: string = res.error;
    const timestamp: string = new Date().toISOString();

    // 에러 로깅
    console.error(`[${timestamp}] ${request.method} ${url} - ${error}`);

    const success = status === HttpStatus.OK || status === HttpStatus.CREATED;

    // response 객체를 직접 조작하지 않고, host를 통해 가져와서 조작
    const httpResponse = host.switchToHttp().getResponse();
    httpResponse.status(status).json({
      success: false,
      message: res.message || 'Internal Server Error',
      data: res.data || null,
    });
  }
}
