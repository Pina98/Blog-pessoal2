import { AuthGuard } from './../constants/constants';
import { Injectable } from "@nestjs/common";

@Injectable ()
export class jwtConstante extends AuthGuard ('jwt'){}


