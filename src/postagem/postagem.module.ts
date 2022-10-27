import { TemaService } from './../tema/services/tema.services';
import { TemaModule } from './../tema/tema.module';
import { PostagemController } from './controllers/postagem.controller';
import { PostagemService } from './services/postagem.service';
import { Module  } from "@nestjs/common/decorators"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Postagem } from "./entities/postagem.entity"

@Module({

    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController],
    exports: [TypeOrmModule],

})

export class PostagemModule{}
