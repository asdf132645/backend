/// <reference types="node" />
import { HL7Service } from './hl7.service';
export declare class HL7Controller {
    private readonly hl7Service;
    constructor(hl7Service: HL7Service);
    parseHL7Message(data: Buffer): Promise<any>;
    createHL7Message(requestBody: any): string;
    sendHl7Message(body: {
        filepath: string;
        msg: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
}
