import { JwtService } from '@nestjs/jwt';
import { UsuarioLogin } from './../entities/usuariologin.entities';
import { Bcrypt } from './../bcrypt/bcrypt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";


@Injectable()
export class AuthService{
    constructor( 
        private UsuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
        ){}

    async validateUser (username: string, password: string): Promise <any>{
        
        const buscaUsuario = await this.UsuarioService.FindByUsuario (username)
        
        if (!buscaUsuario)
        throw new HttpException ('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    const match = await this.bcrypt.criptografarSenha(buscaUsuario.senha)

    if(buscaUsuario && match){
        const{ senha, ...result} = buscaUsuario;
        return result;
        }
        return null;
    }

    async login(Usuariologin: any){
        const payload = {username: Usuariologin.usuario, sub: "blogpessoal"};

        return{
            usuario: UsuarioLogin.usuario,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}