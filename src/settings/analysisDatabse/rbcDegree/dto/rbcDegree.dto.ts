// src/rbcDegree/dto/rbcDegree.dto.ts
export class RbcDegreeDto {
  category_id: string;
  category_nm: string;
  class_id: string;
  class_nm: string;
  degree1: string;
  degree2: string;
  degree3: string;
}

export class UpdateRbcDegreeDto {
  degree1: string;
  degree2: string;
  degree3: string;
}
