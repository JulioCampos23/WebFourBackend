import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tarifa} from '../models';
import {TarifaRepository} from '../repositories';

export class TarifaController {
  constructor(
    @repository(TarifaRepository)
    public tarifaRepository : TarifaRepository,
  ) {}

  @post('/tarifas')
  @response(200, {
    description: 'Tarifa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarifa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifa, {
            title: 'NewTarifa',
            exclude: ['id'],
          }),
        },
      },
    })
    tarifa: Omit<Tarifa, 'id'>,
  ): Promise<Tarifa> {
    return this.tarifaRepository.create(tarifa);
  }

  @get('/tarifas/count')
  @response(200, {
    description: 'Tarifa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarifa) where?: Where<Tarifa>,
  ): Promise<Count> {
    return this.tarifaRepository.count(where);
  }

  @get('/tarifas')
  @response(200, {
    description: 'Array of Tarifa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarifa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarifa) filter?: Filter<Tarifa>,
  ): Promise<Tarifa[]> {
    return this.tarifaRepository.find(filter);
  }

  @patch('/tarifas')
  @response(200, {
    description: 'Tarifa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifa, {partial: true}),
        },
      },
    })
    tarifa: Tarifa,
    @param.where(Tarifa) where?: Where<Tarifa>,
  ): Promise<Count> {
    return this.tarifaRepository.updateAll(tarifa, where);
  }

  @get('/tarifas/{id}')
  @response(200, {
    description: 'Tarifa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarifa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tarifa, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarifa>
  ): Promise<Tarifa> {
    return this.tarifaRepository.findById(id, filter);
  }

  @patch('/tarifas/{id}')
  @response(204, {
    description: 'Tarifa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifa, {partial: true}),
        },
      },
    })
    tarifa: Tarifa,
  ): Promise<void> {
    await this.tarifaRepository.updateById(id, tarifa);
  }

  @put('/tarifas/{id}')
  @response(204, {
    description: 'Tarifa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tarifa: Tarifa,
  ): Promise<void> {
    await this.tarifaRepository.replaceById(id, tarifa);
  }

  @del('/tarifas/{id}')
  @response(204, {
    description: 'Tarifa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tarifaRepository.deleteById(id);
  }
}
