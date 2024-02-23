// src/wbcCustomClass/dto/wbcCustomClass.dto.ts

export class CreateWbcCustomClassDto {
  id: number;
  classArr: classArr[];
  userId?: number;
}

export class classArr {
  customNum: number;
  abbreviation: string;
  className: string;
}

export class UpdateWbcCustomClassDto {
  classArr: classArr[];
  userId?: number;
}
