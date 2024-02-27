// runing-info.dto.ts

export class RuningInfoDto {
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
  stateCd: string;
  tactTime: string;
  maxWbcCount: string;
  lowPowerPath: any[];
  runningPath: any[];
  wbcInfo: WbcInfoDto[];
  rbcInfo: RbcInfoDto[];
  bminfo: any[];
  userId: number;
  cassetId: string;
  isNormal: string;
  processInfo: ProcessInfoDto;
  orderList: OrderDto[];
}

export class WbcInfoDto {
  categoryId: string;
  categoryNm: string;
  classInfo: ClassInfoDto[];
}

export class RbcInfoDto {
  id: string;
  title: string;
  name: string;
  count: string;
  images: any[];
}

export class ClassInfoDto {
  classId: string;
  classNm: string;
  degree: string;
}

export class ProcessInfoDto {
  cassetteNo: number;
  barcodeId: string;
  patientId: string;
  patientName: string;
  wbcCount: string;
  orderDate: string;
  analyzedDttm: string;
}

export class OrderDto {
  barcodeId: string;
  patientName: string;
  orderDate: string;
  analyzedDttm: string;
  state: string;
}
