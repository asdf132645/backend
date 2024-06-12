export declare class CreateBfHotKeysDto {
    userId?: number;
    bfHotKeysItems: BfHotKeysItems[];
}
export declare class BfHotKeysItems {
    id?: number;
    title: string;
    name: string;
    count: number;
    percent: number;
    key: string;
    order: number;
}
