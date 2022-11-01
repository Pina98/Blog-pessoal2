import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './../services/auth.services';




@Injectable()
export class localStrategy extends PassportStrategy (Strategy){
    constructor(private AuthService: AuthService){
        super ({
            usernameFild: 'usuario',
            passwordFild: 'senha'
        });
    }

    async validate(username: string, password: string): Promise <any> {
        const user = await this.AuthService.validateUser(username,password);
        if(!user){
            throw new UnauthorizedException();;
        }
        return user;
    }
    }