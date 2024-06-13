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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const htmlToPdf = require("html-pdf");
const zlib = require("zlib");
let PdfController = class PdfController {
    async convertHTMLToPDF(req, body, res) {
        try {
            let htmlContent = body.htmlContent;
            if (req.headers['content-encoding'] === 'gzip') {
                htmlContent = await new Promise((resolve, reject) => {
                    const gunzip = zlib.createGunzip();
                    let decompressed = '';
                    req
                        .pipe(gunzip)
                        .on('data', (chunk) => {
                        decompressed += chunk.toString();
                    })
                        .on('end', () => {
                        resolve(decompressed);
                    })
                        .on('error', reject);
                });
            }
            const pdfBuffer = await new Promise((resolve, reject) => {
                htmlToPdf.create(htmlContent).toBuffer((error, buffer) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(buffer);
                    }
                });
            });
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="printed_document.pdf"',
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Error while converting HTML to PDF:', error);
            res
                .status(500)
                .send(`Error while converting HTML to PDF: ${error.message}`);
        }
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, common_1.Post)('convert'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "convertHTMLToPDF", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf')
], PdfController);
//# sourceMappingURL=pdf.controller.js.map