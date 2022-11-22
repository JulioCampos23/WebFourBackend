import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Tarifa} from './tarifa.model';

@model()
export class Ingreso extends Entity {
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
  fechaIngreso: string;

  @property({
    type: 'string',
    required: true,
  })
  id_tarifa: string;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Tarifa)
  tarifaId: string;

  constructor(data?: Partial<Ingreso>) {
    super(data);
  }
}

export interface IngresoRelations {
  // describe navigational properties here
}

export type IngresoWithRelations = Ingreso & IngresoRelations;
