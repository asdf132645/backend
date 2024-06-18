// src/wbcCustomClass/dto/wbcCustomClass.dto.ts

export class CreateWbcCustomClassDto {
  id: number;
  classArr: classArr[];
}

export class classArr {
  customNum: number;
  abbreviation: string;
  fullNm: string;
  id: any;
}

export class UpdateWbcCustomClassDto {
  classArr: classArr[];
}