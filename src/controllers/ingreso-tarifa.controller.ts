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
  Tarifa,
} from '../models';
import {IngresoRepository} from '../repositories';

export class IngresoTarifaController {
  constructor(
    @repository(IngresoRepository)
    public ingresoRepository: IngresoRepository,
  ) { }

  @get('/ingresos/{id}/tarifa', {
    responses: {
      '200': {
        description: 'Tarifa belonging to Ingreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarifa)},
          },
        },
      },
    },
  })
  async getTarifa(
    @param.path.string('id') id: typeof Ingreso.prototype.id,
  ): Promise<Tarifa> {
    return this.ingresoRepository.tarifa(id);
  }
}
