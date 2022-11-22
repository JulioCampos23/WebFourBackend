import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {Mensualidad} from './mensualidad.model';
import {Ingreso} from './ingreso.model';
import {Ticket} from './ticket.model';

@model()
export class Vehiculo extends Entity {
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
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_propietario: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasMany(() => Mensualidad)
  mensualidads: Mensualidad[];

  @hasMany(() => Ingreso)
  ingresos: Ingreso[];

  @hasMany(() => Ticket)
  tickets: Ticket[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
