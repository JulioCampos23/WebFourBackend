import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { Persona } from '../models';
import { PersonaRepository } from '../repositories';
import { environmentLocal } from '../config/environmentLocal';
import fetch from 'node-fetch';


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {

  client = twilio( environmentLocal.twilioaccountSid, environmentLocal.twilioauthToken);

  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository
    /* Add @inject to inject parameters */
    ) {}

  //secretKeyAES = 'UGGb=8%mAO%NvTj';
  //secretJWT = 'q}*Mr4|aDg9uW}+d]4';

  encriptar(password : string){
      let encriptado = CryptoJS.AES.encrypt( password, environmentLocal.secretKeyAES).toString();
      return encriptado;
  }

  desencriptar(passwordEncriptado : string){
    let bytes  = CryptoJS.AES.decrypt( passwordEncriptado, environmentLocal.secretKeyAES);
    let desencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return desencriptado;
  }

  login( paramCorreo: string, paramPassword: string) {

    try {
      let busqueda = this.personaRepository.findOne({ 
        where : { correo : paramCorreo }
        // where : { correo : paramCorreo, password : paramPassword } busca por dos parametros
      });

      if( busqueda != null){

        busqueda.then( data => {  
          console.log(data);
        }).catch( error =>{
          console.log(error)
        });
        
        return busqueda;

      }else{
        return false;
      }
    } catch (error) {  // se puede devolver el error en la logica del proceso se devuelve false
      return false;
    } 

  }

    async loginAsync( paramCorreo: string, paramPassword: string) {

    try {
      let busqueda = await this.personaRepository.findOne({ 
        where : { correo : paramCorreo }
      });
  
      if( busqueda != null){

        console.log(busqueda);

        let desencriptado = this.desencriptar(busqueda.password)
        if (desencriptado == paramPassword){
          return busqueda;
        }else{
          return false;
        }

    }else{
        return false;
      }
    } catch (error) {
      return false;
    }    

  }

  GenerarTokenJWT(persona : Persona){
    let token = jwt.sign({
      data:{
        id: persona.id,
        correo : persona.correo,
        nombre : persona.nombres + ' ' + persona.apellidos
      }
    }, environmentLocal.secretJWT,
    { expiresIn: 10800 });  // por defecto tiempo en segundos otro ejemplo "2h" dos horas o "2d" 2 dias

    return token;
  }

  ValidarTokenJWT(token: string){
    try {
      let data = jwt.verify(token, environmentLocal.secretJWT);
      return data;
    } catch (error) {
      return false;
    }
  }

  EnviarSMS( mensaje : string, numeroDestino : string){
    
    this.client.messages
    .create({
      body: mensaje, 
      from: environmentLocal.numberTwilio, 
      to: numeroDestino
    })
    .then( (message : any) => { 
      console.log(message.sid) 
      return message.sid;
    });
  }

  MsEnviarEmail(to : string, subject : string, messageHtml : string){
    
    let url = environmentLocal.urlsmtpcorreo+"?cuerpo_correo="+messageHtml+"&correo_destino="+to+"&asunto_correo="+subject;
    let data = { 
                to: to, 
                subject: subject, 
                message : messageHtml
              };

    fetch(url,{method: 'POST'})
              .then((data : any) => {
                console.log(data);
                return data
              });

    
    /* return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
      } 
    

    });*/

  }

  /*
   * Add service methods here
   */
}
