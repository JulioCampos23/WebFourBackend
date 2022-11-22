import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DsAppParqueaderoDataSource} from '../datasources';
import {Tarifa, TarifaRelations, Ingreso} from '../models';
import {IngresoRepository} from './ingreso.repository';

export class TarifaRepository extends DefaultCrudRepository<
  Tarifa,
  typeof Tarifa.prototype.id,
  TarifaRelations
> {

  public readonly ingresos: HasManyRepositoryFactory<Ingreso, typeof Tarifa.prototype.id>;

  constructor(
    @inject('datasources.dsAppParqueadero') dataSource: DsAppParqueaderoDataSource, @repository.getter('IngresoRepository') protected ingresoRepositoryGetter: Getter<IngresoRepository>,
  ) {
    super(Tarifa, dataSource);
    this.ingresos = this.createHasManyRepositoryFactoryFor('ingresos', ingresoRepositoryGetter,);
    this.registerInclusionResolver('ingresos', this.ingresos.inclusionResolver);
  }
}
