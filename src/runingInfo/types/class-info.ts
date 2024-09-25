import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassInfo {
  @Field(() => String, { nullable: true })
  classId: string;

  @Field(() => String, { nullable: true })
  classNm: string;

  @Field(() => String, { nullable: true })
  degree: string;
}

@ObjectType()
export class RbcInfo {
  @Field(() => [ClassInfo], { nullable: true }) // ClassInfo 객체 배열
  classInfo?: ClassInfo[];

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  categoryNm?: string;
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

  @Field(() => [String], { nullable: true }) // images는 nullable 배열
  images?: string[];

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

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field(() => Int, { nullable: true })
  percent?: number;
}

@ObjectType()
export class WbcResponse {
  @Field(() => [WbcInfo], { nullable: true }) // WbcInfo 객체 배열
  wbcInfo?: WbcInfo[];

  @Field(() => String, { nullable: true }) // totalCount
  totalCount?: string;

  @Field(() => String, { nullable: true }) // maxWbcCount
  maxWbcCount?: string;
}
