import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DsAppParqueaderoDataSource} from '../datasources';
import {Ingreso, IngresoRelations, Vehiculo, Tarifa} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {TarifaRepository} from './tarifa.repository';

export class IngresoRepository extends DefaultCrudRepository<
  Ingreso,
  typeof Ingreso.prototype.id,
  IngresoRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Ingreso.prototype.id>;

  public readonly tarifa: BelongsToAccessor<Tarifa, typeof Ingreso.prototype.id>;

  constructor(
    @inject('datasources.dsAppParqueadero') dataSource: DsAppParqueaderoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('TarifaRepository') protected tarifaRepositoryGetter: Getter<TarifaRepository>,
  ) {
    super(Ingreso, dataSource);
    this.tarifa = this.createBelongsToAccessorFor('tarifa', tarifaRepositoryGetter,);
    this.registerInclusionResolver('tarifa', this.tarifa.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
