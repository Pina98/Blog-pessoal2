import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { Tema } from "../entities/tema.entities";
import { TemaService } from '../services/tema.services';
import{ JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/tema')
    export class TemaController{
        constructor (private readonly temaservice: TemaService) {}

        @Get()
        @HttpCode (HttpStatus.OK)
        findAll(): Promise < Tema []>{
            return this.temaservice.findAll();
        }

        @Get('/id')
        @HttpCode (HttpStatus.OK)
        findById (@Param('id, ParseIntPipe') id: number ): Promise <Tema> {
            return this.temaService.findById(id);
        }

        @Get ('/descricao/:descricao')
        @HttpCode(HttpStatus.OK)
        findByDescricao(@Param('descricao')descricao: string ): Promise <Tema[]>{
            return this.temaService.findByDescricao(descricao);
        }

        @Post ()
        @HttpCode(HttpStatus.CREATED)
        create(@Body()tema:Tema): Promise <Tema>{
            return this.temaService.create(tema);
        }

                @Put ()
                @HttpCode(HttpStatus.OK)
                UpdateDateColumn(@Body()tema:Tema): Promise <Tema>{
                    return this.temaService.update(tema);
                }

                @Delete('/:id')
                @HttpCode(HttpStatus.NO_CONTENT)
                delete (@Param('id', ParseIntPipe)id: number){
                    return this.temaService.delete(id)
                }

        

    }