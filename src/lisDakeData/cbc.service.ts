import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { LoggerService } from '../logger.service';

const execPromise = promisify(exec);

@Injectable()
export class CbcService {
  constructor(private readonly logger: LoggerService) {}

  getMockCbcWorkList(): string {
    // 가짜 XML 데이터를 생성
    return `
    <root>
      <spcworklist>
        <worklist>
          <classCd>
            <_cdata>LHR100</_cdata>
          </classCd>
          <inptrslt>
            <_cdata>5000</_cdata>
          </inptrslt>
        </worklist>
        <worklist>
          <classCd>
            <_cdata>LHR10501</_cdata>
          </classCd>
          <inptrslt>
            <_cdata>45.0</_cdata>
          </inptrslt>
        </worklist>
        <worklist>
          <classCd>
            <_cdata>LHR10502</_cdata>
          </classCd>
          <inptrslt>
            <_cdata>30.0</_cdata>
          </inptrslt>
        </worklist>
        <worklist>
          <classCd>
            <_cdata>LHR10503</_cdata>
          </classCd>
          <inptrslt>
            <_cdata>15.0</_cdata>
          </inptrslt>
        </worklist>
        <worklist>
          <classCd>
            <_cdata>LHR10504</_cdata>
          </classCd>
          <inptrslt>
            <_cdata>10.0</_cdata>
          </inptrslt>
        </worklist>
        <worklist>
          <classCd>
            <_cdata>LHR10505</_cdata>
          </classCd>
          <inptrslt>
            <_cdata>5.0</_cdata>
          </inptrslt>
        </worklist>
      </spcworklist>
    </root>
    `;
  }

  async fetchExternalData(queryParams: {
    [key: string]: string;
  }): Promise<any> {
    // 운영 http://emr012.cmcnu.or.kr/cmcnu/.live
    // 개발 http://emr012edu.cmcnu.or.kr/cmcnu/.live
    // UIMD 테스트 http://192.168.0.131/api/cbc/liveTest
    const baseUrl = 'http://emr012edu.cmcnu.or.kr/cmcnu/.live';
    // const baseUrl = 'http://192.168.0.131/api/cbc/liveTest';
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${baseUrl}?${queryString}`;

    this.logger.cbc(`cbc-service-fetchExternalData: ${url}`);

    const curlCommand = `curl -s "${url}"`; // -s 옵션을 사용하여 진행 상황 출력 숨김

    try {
      const { stdout, stderr } = await execPromise(curlCommand);

      if (stderr) {
        console.error('Curl stderr lis err:', stderr); // stderr를 로그에 기록
      }

      return stdout; // 응답 데이터는 stdout에서 반환
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}
