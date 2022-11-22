import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import {Email, Persona, Usuario} from '../models';
import {PersonaRepository} from '../repositories';
import { AutenticacionService } from '../services';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AutenticacionService)
    public authenticationService : AutenticacionService,
  ) {}


  @post('enviarMail')
  @response(200, {
    description: 'Email enviado con exito'
  })
  async enviarEmail(
    @requestBody() email : Email
  ){

    try {
      let response = await this.authenticationService.MsEnviarEmail(email.to, email.subject, email.message);
      console.log(response);
      //return response

      /* let datos =  await response.json()

      if(datos.status == "error"){
        return {
          status : datos.status,
          message : datos.message
        }
      }else{
        return {
          status : "Se envio el email con exito",
          message : "ok"
        }      
      }*/
    } catch (error) {
      return {
        status : "Ocurrio un error al enviar el email",
        message : error
      }
    }
    
  }

// controlador para el login

  @authenticate.skip()
  @post('/login')
  @response(200, {
    description: 'Usuario logueado con exito'
  })
  async login(
    @requestBody() usuario : Usuario
  ){
    let persona = await this.authenticationService.loginAsync( usuario.correo, usuario.password );
    
    // Enviar SMS
    let mensagesms = this.authenticationService.EnviarSMS('Se ha logueado con exito al programa parqueadero: ' , '+573176415522');

    if (persona){
      let token = this.authenticationService.GenerarTokenJWT(persona);
      return {
        datos:{
          id: persona.id,
          correo : persona.correo,
          nombre : persona.nombres + ' ' + persona.apellidos,
          telefono : persona.telefono
        },
        token : token
        //datos : persona
      }

    }else{
      throw new HttpErrors[401]('Usuario no autorizado') 
      //throw new HttpErrors.Unauthorized('Usuario no autorizado')   // Otra forma
    }
  }


  @authenticate('admin')
  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    // Encriptar password
    persona.password = this.authenticationService.encriptar(persona.password)

    return this.personaRepository.create(persona);
  }

  @authenticate('admin')
  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }
  
  @authenticate('admin')
  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
