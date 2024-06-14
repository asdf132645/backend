export declare class RuningInfoDtoItems {
    id: number;
    state?: boolean;
    traySlot?: string;
    slotNo: string;
    barcodeNo: string;
    patientId: string;
    patientNm: string;
    gender: string;
    birthDay: string;
    wbcCount: string;
    slotId: string;
    orderDttm: string;
    testType: string;
    analyzedDttm: string;
    // createDate: string;
    pltCount: string;
    malariaCount: string;
    maxRbcCount: string;
    // stateCd: string;
    tactTime: string;
    maxWbcCount: string;
    lowPowerPath: any[];
    // runningPath: any[];
    wbcInfo: any[];
    wbcInfoAfter?: any[];
    rbcInfo: any[];
    rbcInfoAfter: any[];
    userId: number;
    cassetId: string;
    isNormal: string;
    processInfo: ProcessInfoDto;
    orderList: OrderDto[];
    submitState?: string;
    submitOfDate?: Date;
    signedUserId?: string;
    classificationResult?: any[];
    isNsNbIntegration?: string;
    wbcMemo?: string;
    rbcMemo?: string;
    pcIp: string;
    cbcPatientNo?: string;
    cbcPatientNm?: string;
    cbcSex?: string;
    cbcAge?: string;
    rootPath?: string;
}
export declare class WbcInfoDto {
    title: string;
    name: string;
    count: string;
    images: any[];
}
export declare class RbcInfoDto {
    title: string;
    name: string;
    count: string;
    images: any[];
}
export declare class ClassInfoDto {
    classId: string;
    classNm: string;
    degree: string;
}
export declare class ProcessInfoDto {
    cassetteNo: number;
    barcodeId: string;
    patientId: string;
    patientName: string;
    wbcCount: string;
    orderDate: string;
    analyzedDttm: string;
}
export declare class OrderDto {
    id: string;
    barcodeId: string;
    patientName: string;
    orderDate: string;
    analyzedDttm: string;
    state: string;
}
export declare class CreateRuningInfoDto {
    userId?: number;
    runingInfoDtoItems: RuningInfoDtoItems;
}
export declare class UpdateRuningInfoDto {
    userId: number;
    runingInfoDtoItems: RuningInfoDtoItems[];
}
