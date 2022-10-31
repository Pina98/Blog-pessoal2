import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from "passport-jwt";
import { jwtConstante } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
    constructor(){
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            ServiceOrKey: jwtConstante.secret,
        });
    }

    async validate(payLord: any){
        return{ UserId: payLord.sub, username: payLord.username};
    }




}

