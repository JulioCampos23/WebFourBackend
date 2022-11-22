import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mensualidad,
  Vehiculo,
} from '../models';
import {MensualidadRepository} from '../repositories';

export class MensualidadVehiculoController {
  constructor(
    @repository(MensualidadRepository)
    public mensualidadRepository: MensualidadRepository,
  ) { }

  @get('/mensualidads/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Mensualidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Mensualidad.prototype.id,
  ): Promise<Vehiculo> {
    return this.mensualidadRepository.vehiculo(id);
  }
}
