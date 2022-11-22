import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ingreso,
  Vehiculo,
} from '../models';
import {IngresoRepository} from '../repositories';

export class IngresoVehiculoController {
  constructor(
    @repository(IngresoRepository)
    public ingresoRepository: IngresoRepository,
  ) { }

  @get('/ingresos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Ingreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Ingreso.prototype.id,
  ): Promise<Vehiculo> {
    return this.ingresoRepository.vehiculo(id);
  }
}
