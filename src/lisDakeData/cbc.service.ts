import { Injectable } from '@nestjs/common';

@Injectable()
export class CbcService {
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
}
