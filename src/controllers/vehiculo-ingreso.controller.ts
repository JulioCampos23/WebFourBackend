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
  Ingreso,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoIngresoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Ingreso',
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
    return this.vehiculoRepository.ingresos(id).find(filter);
  }

  @post('/vehiculos/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingreso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {
            title: 'NewIngresoInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) ingreso: Omit<Ingreso, 'id'>,
  ): Promise<Ingreso> {
    return this.vehiculoRepository.ingresos(id).create(ingreso);
  }

  @patch('/vehiculos/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Vehiculo.Ingreso PATCH success count',
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
    return this.vehiculoRepository.ingresos(id).patch(ingreso, where);
  }

  @del('/vehiculos/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Vehiculo.Ingreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.vehiculoRepository.ingresos(id).delete(where);
  }
}
