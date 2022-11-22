import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ingreso} from './ingreso.model';

@model()
export class Tarifa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @hasMany(() => Ingreso)
  ingresos: Ingreso[];

  constructor(data?: Partial<Tarifa>) {
    super(data);
  }
}

export interface TarifaRelations {
  // describe navigational properties here
}

export type TarifaWithRelations = Tarifa & TarifaRelations;
