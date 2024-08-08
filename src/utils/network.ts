import * as os from 'os';

export async function isServerRunningLocally(
  localIPAddress: string,
): Promise<boolean> {
  console.log(`Local IP Address: ${localIPAddress}`);

  if (!localIPAddress) {
    return false; // IP 주소가 주어지지 않았거나 빈 문자열일 경우 false 반환
  }

  const networkInterfaces = os.networkInterfaces();

  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]!) {
      // IPv4 주소만 확인
      if (net.family === 'IPv4' && !net.internal) {
        if (net.address === localIPAddress) {
          return true; // 주어진 IP 주소가 로컬 네트워크 인터페이스에 존재함
        }
      }
    }
  }

  return false; // 로컬 네트워크 인터페이스에서 주어진 IP 주소를 찾지 못함
}
