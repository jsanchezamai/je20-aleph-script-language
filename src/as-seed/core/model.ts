export type IType = any;

export interface IData extends IType {
}

export interface IRowData extends IRow {
    data: IData;
}

export interface IRowFK extends IRow {
}

export interface IRowPK extends IRow {
}

export interface IRow {
}

export interface IModel {
    id: ID;

    rows: IRow[];
}

export class Model implements IModel {

    id: ID = "NotInitedModel";

    rows = [];
}

export type ID = any;