export declare class CreateWbcHotKeysDto {
    userId?: number;
    wbcHotKeysItems: wbcHotKeysItems[];
}
export declare class wbcHotKeysItems {
    id?: number;
    title: string;
    name: string;
    count: number;
    percent: number;
    key: string;
    order: number;
}
