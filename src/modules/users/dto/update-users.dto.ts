import { IsOptional } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-users.dto";

export class UpdateUserDto extends PartialType(CreateUserDto){

    @IsOptional()
    isActive:boolean

}
