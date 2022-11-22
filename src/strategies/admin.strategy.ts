import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from 'parse-bearer-token';
import { AutenticacionService  } from "../services";

export class StrategyAdministardor implements AuthenticationStrategy{
    name: string = 'admin';

    constructor(
        @service( AutenticacionService)
        public autenticacionService : AutenticacionService,
        ){

    }
    async authenticate(request : Request): Promise<UserProfile | undefined>{
        let token = parseBearerToken(request);
        if( token ){
            let datos = this.autenticacionService.ValidarTokenJWT(token);
            console.log(datos)
            if(datos){
                //let data = JSON.parse(datos);
                console.log(datos)
                //let descriptado = this.authenticacionService.desencriptarObjeto( datos.toString() );
                //console.log(descriptado);
                
                let perfil : UserProfile = Object.assign({
                    datos : datos
                });

                return perfil;
            }else{
                throw new HttpErrors[401]("Token incluido no es valido para el administrador");
            }
        }else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud del administardor");
        }
    }
}
