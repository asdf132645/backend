import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassInfo {
  @Field(() => String, { nullable: true })
  classId?: string;

  @Field(() => String, { nullable: true })
  classNm?: string;

  @Field(() => String, { nullable: true })
  degree?: string;

  @Field(() => String, { nullable: true })
  originalDegree?: string;
}

@ObjectType()
export class RbcAfterClassInfoObj {
  @Field(() => String, { nullable: true })
  classId?: string;

  @Field(() => String, { nullable: true })
  classNm?: string;

  @Field(() => String, { nullable: true })
  degree?: string;

  @Field(() => Number, { nullable: true })
  originalDegree?: number;

  @Field(() => String, { nullable: true })
  percent?: string;
}

@ObjectType()
export class RbcClassInfo {
  @Field(() => [ClassInfo], { nullable: 'itemsAndList' })
  classInfo?: ClassInfo[];

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  categoryNm?: string;
}

@ObjectType()
export class RbcAfterClassInfos {
  @Field(() => [RbcAfterClassInfoObj], { nullable: 'itemsAndList' })
  classInfo?: RbcAfterClassInfoObj[];

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  categoryNm?: string;
}

@ObjectType()
export class RbcInfo {
  @Field(() => [RbcClassInfo], { nullable: 'itemsAndList' })
  rbcClass?: RbcClassInfo[];

  @Field(() => String, { nullable: true })
  malariaCount: string;

  @Field(() => String, { nullable: true })
  maxRbcCount: string;

  @Field(() => String, { nullable: true })
  pltCount: string;
}

@ObjectType()
export class abnormalClassInfo {
  @Field(() => String, { nullable: true })
  classNm?: string;

  @Field(() => String, { nullable: true })
  val?: string;
}

@ObjectType()
export class WbcInfoAfter {
  @Field(() => String, { nullable: true }) // id는 nullable
  id?: string;

  @Field(() => String, { nullable: true }) // name은 nullable
  name?: string;

  @Field(() => String, { nullable: true }) // count는 nullable
  count?: string;

  @Field(() => String, { nullable: true }) // title은 nullable
  title?: string;

  @Field(() => [wbcImages], { nullable: 'itemsAndList' })
  images?: wbcImages[];

  @Field(() => String, { nullable: true }) // percent는 nullable
  percent?: string;
}

@ObjectType()
export class WbcInfo {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  count?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => [wbcImages], { nullable: 'itemsAndList' })
  images?: wbcImages[];

  @Field(() => Int, { nullable: true })
  percent?: number;
}

@ObjectType()
export class Coordinates {
  @Field(() => String, { nullable: true })
  display?: string;
}

@ObjectType()
export class wbcImages {
  @Field(() => Coordinates, { nullable: true })
  coordinates?: Coordinates;
  @Field(() => String, { nullable: true })
  fileName?: string;
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  filter?: string;
  @Field(() => Number, { nullable: true })
  height?: number;
  @Field(() => Number, { nullable: true })
  width?: number;
}

@ObjectType()
export class WbcResponse {
  @Field(() => [[WbcInfo]], { nullable: true }) // WbcInfo 객체 배열
  wbcInfo?: [WbcInfo[]];

  @Field(() => String, { nullable: true }) // totalCount
  totalCount?: string;

  @Field(() => String, { nullable: true }) // maxWbcCount
  maxWbcCount?: string;
}
