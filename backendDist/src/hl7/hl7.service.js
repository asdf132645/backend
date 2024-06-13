"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HL7Service = void 0;
const common_1 = require("@nestjs/common");
const hl7 = require("simple-hl7");
const path = require("path");
const fs = require("fs");
let HL7Service = class HL7Service {
    parseHL7Message(data) {
        const parser = new hl7.Parser({ segmentSeperator: '\n' });
        return parser.parse(data.toString());
    }
    generateHL7Message(sendingApp, sendingFacility, receivingApp, receivingFacility, dateTime, messageType, messageControlId, processingId, hl7VersionId, wbcInfo, result) {
        const msg = new hl7.Message(sendingApp, sendingFacility, receivingApp, receivingFacility, dateTime, '', messageType, messageControlId, processingId, hl7VersionId);
        let seq = 0;
        result.forEach((lisCode) => {
            if (lisCode.LIS_CD !== '') {
                wbcInfo.forEach((wbcItem) => {
                    if (wbcItem.id === lisCode.IA_CD &&
                        (Number(wbcItem.percent) > 0 || Number(wbcItem.count))) {
                        msg.addSegment('OBX', seq++, 'NM', lisCode.LIS_CD, '', wbcItem.count, '', '', '', '', '', 'P\n');
                        msg.addSegment('OBX', seq++, 'NM', lisCode.LIS_CD + '%', '', wbcItem.percent, '%', '', '', '', '', 'P\n');
                    }
                });
            }
        });
        return msg.toString();
    }
    async sendHl7Message(filepath, msg) {
        const directory = path.dirname(filepath);
        return new Promise((resolve, reject) => {
            fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    return reject('Failed to create directory');
                }
                fs.writeFile(filepath, msg, (err) => {
                    if (err) {
                        return reject('Failed to write HL7 message to file');
                    }
                    resolve();
                });
            });
        });
    }
};
exports.HL7Service = HL7Service;
exports.HL7Service = HL7Service = __decorate([
    (0, common_1.Injectable)()
], HL7Service);
//# sourceMappingURL=hl7.service.js.map