import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UsuarioLogin } from "../entities/usuariologin.entities";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.services";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller("/auth")
export class AuthControllers{
    constructor(private authService : AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UsuarioLogin): Promise <any>{
        return this.authService.login(user);
    }
}