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
  Vehiculo,
  Mensualidad,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoMensualidadController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/mensualidads', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Mensualidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensualidad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mensualidad>,
  ): Promise<Mensualidad[]> {
    return this.vehiculoRepository.mensualidads(id).find(filter);
  }

  @post('/vehiculos/{id}/mensualidads', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensualidad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensualidad, {
            title: 'NewMensualidadInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) mensualidad: Omit<Mensualidad, 'id'>,
  ): Promise<Mensualidad> {
    return this.vehiculoRepository.mensualidads(id).create(mensualidad);
  }

  @patch('/vehiculos/{id}/mensualidads', {
    responses: {
      '200': {
        description: 'Vehiculo.Mensualidad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensualidad, {partial: true}),
        },
      },
    })
    mensualidad: Partial<Mensualidad>,
    @param.query.object('where', getWhereSchemaFor(Mensualidad)) where?: Where<Mensualidad>,
  ): Promise<Count> {
    return this.vehiculoRepository.mensualidads(id).patch(mensualidad, where);
  }

  @del('/vehiculos/{id}/mensualidads', {
    responses: {
      '200': {
        description: 'Vehiculo.Mensualidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mensualidad)) where?: Where<Mensualidad>,
  ): Promise<Count> {
    return this.vehiculoRepository.mensualidads(id).delete(where);
  }
}
