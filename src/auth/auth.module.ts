import { AuthControllers } from './controllers/auth.controllers';
import { JwtStrategy } from './strategy/jwt.strategy';
import { localStrategy } from './strategy/local.strategy';
import { AuthService } from './services/auth.services';
import { Bcrypt } from './bcrypt/bcrypt';
import { jwtConstante } from './constants/constants';
import { UsuarioModule } from '../usuario/usuario.module';
import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";


@Module({
    imports:[
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret:jwtConstante.secret,
            signOptions: { expiresIn: '24h'},
        }),
    ],
    providers: [Bcrypt,AuthService, localStrategy, JwtStrategy],
    controllers:[AuthControllers],
    exports: [Bcrypt],
})
export class AuthModule{}