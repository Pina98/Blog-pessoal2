import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from "passport-jwt";
import { Jwtconstants} from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy (strategy){
    constructor(){
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            ServiceOrKey: jwtConstants.secret,
        });
    }

    async validate(payLord: any){
        return{ userId paylord.sub, username: payLord.username};
    }




}

