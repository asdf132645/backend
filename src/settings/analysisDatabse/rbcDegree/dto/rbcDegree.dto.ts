// src/rbcDegree/dto/rbcDegree.dto.ts
export class RbcDegreeDto {
  categoryId: string;
  categoryNm: string;
  classId: string;
  classNm: string;
  degree1: string;
  degree2: string;
  degree3: string;
}

export class UpdateRbcDegreeDto {
  degree1: string;
  degree2: string;
  degree3: string;
}
