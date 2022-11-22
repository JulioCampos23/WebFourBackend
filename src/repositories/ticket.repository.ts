import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DsAppParqueaderoDataSource} from '../datasources';
import {Ticket, TicketRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.id,
  TicketRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Ticket.prototype.id>;

  constructor(
    @inject('datasources.dsAppParqueadero') dataSource: DsAppParqueaderoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Ticket, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
