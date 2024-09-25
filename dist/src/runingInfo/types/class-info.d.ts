export declare class ClassInfo {
    classId: string;
    classNm: string;
    degree: string;
}
export declare class RbcInfo {
    classInfo?: ClassInfo[];
    categoryId?: string;
    categoryNm?: string;
}
export declare class WbcInfoAfter {
    id?: string;
    name?: string;
    count?: string;
    title?: string;
    images?: string[];
    percent?: string;
}
export declare class WbcInfo {
    id?: string;
    name?: string;
    count?: string;
    title?: string;
    images?: string[];
    percent?: number;
}
export declare class WbcResponse {
    wbcInfo?: WbcInfo[];
    totalCount?: string;
    maxWbcCount?: string;
}
