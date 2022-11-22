import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DsAppParqueaderoDataSource} from '../datasources';
import {Mensualidad, MensualidadRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class MensualidadRepository extends DefaultCrudRepository<
  Mensualidad,
  typeof Mensualidad.prototype.id,
  MensualidadRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Mensualidad.prototype.id>;

  constructor(
    @inject('datasources.dsAppParqueadero') dataSource: DsAppParqueaderoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Mensualidad, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
