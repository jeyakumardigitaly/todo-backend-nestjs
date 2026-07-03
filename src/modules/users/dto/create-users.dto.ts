import { IsEmail, IsString, MaxLength, MinLength, IsEnum } from "class-validator";



export class CreateUserDto{

    @IsString()
    @MaxLength(100)
    name:string;

    @IsEmail()
    email:string;

    @MinLength(6)
    password:string;

}