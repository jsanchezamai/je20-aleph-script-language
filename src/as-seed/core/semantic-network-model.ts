export type ITerminal = any;
export type INoTerminal = any;
export type IProduction = any;
export type IGenesisBlock = any;

export type ISemanticNetworkModel = {
    name: string;
    terminals: ITerminal[];
    non_terminals: INoTerminal[];
    productions: IProduction[];
    genesis: IGenesisBlock[];
};

export class SemanticNetworkModel implements ISemanticNetworkModel {
    name = "DefaultNetwork"
    terminals = [];
    non_terminals = [];
    productions = [];
    genesis = [];
};