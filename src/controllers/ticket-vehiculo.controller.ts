import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ticket,
  Vehiculo,
} from '../models';
import {TicketRepository} from '../repositories';

export class TicketVehiculoController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository: TicketRepository,
  ) { }

  @get('/tickets/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Ticket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Ticket.prototype.id,
  ): Promise<Vehiculo> {
    return this.ticketRepository.vehiculo(id);
  }
}
