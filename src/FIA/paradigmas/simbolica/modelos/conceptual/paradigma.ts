import { IBaseConocimiento, IModeloConceptual } from '../../paradigma';

export class Conceptual implements IModeloConceptual {
    nombre: string;

    base: IBaseConocimiento;

}