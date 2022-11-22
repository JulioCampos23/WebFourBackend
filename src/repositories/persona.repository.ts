import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DsAppParqueaderoDataSource} from '../datasources';
import {Persona, PersonaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.dsAppParqueadero') dataSource: DsAppParqueaderoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Persona, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
