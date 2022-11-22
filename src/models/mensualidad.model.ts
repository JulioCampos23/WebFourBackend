import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Mensualidad extends Entity {
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
  id_placa: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicial: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinal: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  constructor(data?: Partial<Mensualidad>) {
    super(data);
  }
}

export interface MensualidadRelations {
  // describe navigational properties here
}

export type MensualidadWithRelations = Mensualidad & MensualidadRelations;
