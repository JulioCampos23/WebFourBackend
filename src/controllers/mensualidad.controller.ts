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
import {Mensualidad} from '../models';
import {MensualidadRepository} from '../repositories';

export class MensualidadController {
  constructor(
    @repository(MensualidadRepository)
    public mensualidadRepository : MensualidadRepository,
  ) {}

  @post('/mensualidads')
  @response(200, {
    description: 'Mensualidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mensualidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensualidad, {
            title: 'NewMensualidad',
            exclude: ['id'],
          }),
        },
      },
    })
    mensualidad: Omit<Mensualidad, 'id'>,
  ): Promise<Mensualidad> {
    return this.mensualidadRepository.create(mensualidad);
  }

  @get('/mensualidads/count')
  @response(200, {
    description: 'Mensualidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mensualidad) where?: Where<Mensualidad>,
  ): Promise<Count> {
    return this.mensualidadRepository.count(where);
  }

  @get('/mensualidads')
  @response(200, {
    description: 'Array of Mensualidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mensualidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mensualidad) filter?: Filter<Mensualidad>,
  ): Promise<Mensualidad[]> {
    return this.mensualidadRepository.find(filter);
  }

  @patch('/mensualidads')
  @response(200, {
    description: 'Mensualidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensualidad, {partial: true}),
        },
      },
    })
    mensualidad: Mensualidad,
    @param.where(Mensualidad) where?: Where<Mensualidad>,
  ): Promise<Count> {
    return this.mensualidadRepository.updateAll(mensualidad, where);
  }

  @get('/mensualidads/{id}')
  @response(200, {
    description: 'Mensualidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mensualidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mensualidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Mensualidad>
  ): Promise<Mensualidad> {
    return this.mensualidadRepository.findById(id, filter);
  }

  @patch('/mensualidads/{id}')
  @response(204, {
    description: 'Mensualidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensualidad, {partial: true}),
        },
      },
    })
    mensualidad: Mensualidad,
  ): Promise<void> {
    await this.mensualidadRepository.updateById(id, mensualidad);
  }

  @put('/mensualidads/{id}')
  @response(204, {
    description: 'Mensualidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensualidad: Mensualidad,
  ): Promise<void> {
    await this.mensualidadRepository.replaceById(id, mensualidad);
  }

  @del('/mensualidads/{id}')
  @response(204, {
    description: 'Mensualidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensualidadRepository.deleteById(id);
  }
}
