import { Usuario } from './../../usuario/entities/usuario.entities';
import { ApiProperty } from "@nestjs/swagger"
export class UsuarioLogin{


    @ApiProperty()
    public Usuario: string

    @ApiProperty()
    public senha: string
    static usuario: any;
}