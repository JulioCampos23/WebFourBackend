import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DsAppParqueaderoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Persona, Mensualidad, Ingreso, Ticket} from '../models';
import {PersonaRepository} from './persona.repository';
import {MensualidadRepository} from './mensualidad.repository';
import {IngresoRepository} from './ingreso.repository';
import {TicketRepository} from './ticket.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Vehiculo.prototype.id>;

  public readonly mensualidads: HasManyRepositoryFactory<Mensualidad, typeof Vehiculo.prototype.id>;

  public readonly ingresos: HasManyRepositoryFactory<Ingreso, typeof Vehiculo.prototype.id>;

  public readonly tickets: HasManyRepositoryFactory<Ticket, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.dsAppParqueadero') dataSource: DsAppParqueaderoDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('MensualidadRepository') protected mensualidadRepositoryGetter: Getter<MensualidadRepository>, @repository.getter('IngresoRepository') protected ingresoRepositoryGetter: Getter<IngresoRepository>, @repository.getter('TicketRepository') protected ticketRepositoryGetter: Getter<TicketRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.tickets = this.createHasManyRepositoryFactoryFor('tickets', ticketRepositoryGetter,);
    this.registerInclusionResolver('tickets', this.tickets.inclusionResolver);
    this.ingresos = this.createHasManyRepositoryFactoryFor('ingresos', ingresoRepositoryGetter,);
    this.registerInclusionResolver('ingresos', this.ingresos.inclusionResolver);
    this.mensualidads = this.createHasManyRepositoryFactoryFor('mensualidads', mensualidadRepositoryGetter,);
    this.registerInclusionResolver('mensualidads', this.mensualidads.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
