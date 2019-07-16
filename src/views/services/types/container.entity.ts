export interface IContainer {
    values: any[];
    pagination?: IPagination;

}

export interface IPagination {
    limit: number;
    offset: number;
    totalElements?: number;
}
