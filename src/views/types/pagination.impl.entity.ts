import { IPagination } from "../services/types";

export default class Pagination implements IPagination {
    public limit: number = 2;
    public offset: number = 0;
}
