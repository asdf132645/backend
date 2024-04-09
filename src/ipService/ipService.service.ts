import { Injectable } from '@nestjs/common';

@Injectable()
export class IpService {
  getClientIp(req): string {
    // 클라이언트의 IPv4 주소 가져오기
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    // IPv6 주소를 IPv4 주소로 변환하여 반환
    return ip.includes('::') ? ip.split(':').reverse()[0] : ip;
  }
}
