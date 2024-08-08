import * as os from 'os';

export async function isServerRunningLocally(): Promise<string> {
  const networkInterfaces = os.networkInterfaces();

  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]!) {
      // IPv4 주소만 확인
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; // 주어진 IP 주소가 로컬 네트워크 인터페이스에 존재함
      }
    }
  }
}
