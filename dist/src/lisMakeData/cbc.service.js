"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbcService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const logger_service_1 = require("../logger.service");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
let CbcService = class CbcService {
    constructor(logger) {
        this.logger = logger;
    }
    getMockCbcWorkList() {
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
    async fetchExternalData(queryParams) {
        const baseUrl = 'http://emr012.cmcnu.or.kr/cmcnu/.live';
        const queryString = Object.keys(queryParams)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        const url = `${baseUrl}?${queryString}`;
        this.logger.cbc(`cbc-service-fetchExternalData: ${url}`);
        const curlCommand = `curl -s "${url}"`;
        try {
            const { stdout, stderr } = await execPromise(curlCommand);
            if (stderr) {
                this.logger.cbc(`Curl stderr lis err:, ${stderr}`);
            }
            this.logger.cbc(`cbc 응답 값:, ${stdout}`);
            return stdout;
        }
        catch (error) {
            this.logger.cbc(`cbc error.message:, ${error.message}`);
        }
    }
};
exports.CbcService = CbcService;
exports.CbcService = CbcService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], CbcService);
//# sourceMappingURL=cbc.service.js.map