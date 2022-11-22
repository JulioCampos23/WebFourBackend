import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tarifa,
  Ingreso,
} from '../models';
import {TarifaRepository} from '../repositories';

export class TarifaIngresoController {
  constructor(
    @repository(TarifaRepository) protected tarifaRepository: TarifaRepository,
  ) { }

  @get('/tarifas/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Array of Tarifa has many Ingreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ingreso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ingreso>,
  ): Promise<Ingreso[]> {
    return this.tarifaRepository.ingresos(id).find(filter);
  }

  @post('/tarifas/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Tarifa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingreso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tarifa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {
            title: 'NewIngresoInTarifa',
            exclude: ['id'],
            optional: ['tarifaId']
          }),
        },
      },
    }) ingreso: Omit<Ingreso, 'id'>,
  ): Promise<Ingreso> {
    return this.tarifaRepository.ingresos(id).create(ingreso);
  }

  @patch('/tarifas/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Tarifa.Ingreso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {partial: true}),
        },
      },
    })
    ingreso: Partial<Ingreso>,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.tarifaRepository.ingresos(id).patch(ingreso, where);
  }

  @del('/tarifas/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Tarifa.Ingreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.tarifaRepository.ingresos(id).delete(where);
  }
}
