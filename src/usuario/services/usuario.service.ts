import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "src/auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entities";


@Injectable()

export class UsuarioService{
    constructor(
        
        @InjectRepository(Usuario)
        private usuarioReposotory: Repository <Usuario>,
        private bcrypt: Bcrypt ){}

        async FindByUsuario(usuario:string): Promise <Usuario | undefined>{
            return await this.usuarioReposotory.findOne({
                where: {
                    usuario: usuario
                }
            })
        }

        async FindAll(): Promise <Usuario []> {
            return await this.usuarioReposotory.find({
                relations: {
                    postagem: true
                }
            }
        );
    }


        async FindById(id: number): Promise <Usuario>{
        let usuario = await this.usuarioReposotory.findOne({
            where:{
                id
            },
            relations:{
                postagem: true
            }
        })
            
        if (!usuario) 
            throw new HttpException(' Usuario não encontrado!!', HttpStatus.NOT_FOUND)
        
        return usuario;
    
    }
    

    async create(usuario: Usuario): Promise <Usuario>{

        let buscaUsuario = await this.FindByUsuario(usuario.usuario);

        if (!buscaUsuario){
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioReposotory.save(usuario);
        }

        throw new HttpException(' Usuario Existente !!', HttpStatus.BAD_REQUEST);

    }

    async update(usuario: Usuario): Promise <Usuario>{

        
        let updateUsuario: Usuario = await this.FindById(usuario.id);
        let buscaUsuario = await this.FindByUsuario(usuario.usuario);

        if (!updateUsuario)
            throw new HttpException ('Usuario não encontrado !', HttpStatus.NOT_FOUND);

         if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException ('E-mail já encontrado !', HttpStatus.BAD_REQUEST);



            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioReposotory.save(usuario);
        }
    }

