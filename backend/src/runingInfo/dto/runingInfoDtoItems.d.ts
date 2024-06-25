export declare class RuningInfoDtoItems {
    id: number;
    lock_status?: boolean;
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
    pltCount: string;
    malariaCount: string;
    maxRbcCount: string;
    tactTime: string;
    maxWbcCount: string;
    bf_lowPowerPath: any[];
    wbcInfo: any[];
    wbcInfoAfter?: any[];
    rbcInfo: any[];
    rbcInfoAfter: any[];
    cassetId: string;
    isNormal: string;
    processInfo: ProcessInfoDto;
    orderList: OrderDto[];
    submitState?: string;
    submitOfDate?: Date;
    submitUserId?: string;
    classificationResult?: any[];
    isNsNbIntegration?: string;
    wbcMemo?: string;
    rbcMemo?: string;
    pcIp: string;
    cbcPatientNo?: string;
    cbcPatientNm?: string;
    cbcSex?: string;
    cbcAge?: string;
    img_drive_root_path?: string;
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
