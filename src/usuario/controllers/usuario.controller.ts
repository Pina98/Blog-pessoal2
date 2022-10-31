import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entities";
import { UsuarioService } from '../services/usuario.service';
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard"

@ApiTags('Usuario')
@Controller("/usuario")
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usarioService: UsuarioService){}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usarioService.FindAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usarioService.create(usuario);
    }

    
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)

    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usarioService.update(usuario);
    }
}