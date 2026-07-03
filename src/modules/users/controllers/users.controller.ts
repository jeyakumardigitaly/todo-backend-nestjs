import { Body, Controller, Delete, Get, Post, Patch, Param, ParseIntPipe, UseGuards} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-users.dto';
import { UpdateUserDto } from '../dto/update-users.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth-guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post()
    create(@Body() dto:CreateUserDto){
        return this.usersService.create(dto)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(
        @CurrentUser()
        user:any,
    ){
        return user
    }

    @Get()
    findAll(){
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe)id:number,
            @Body() dto: UpdateUserDto)
    {
        return this.usersService.update(id,dto)
    }

    
    @Delete(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.ADMIN)
    remove(@Param('id',ParseIntPipe) id:number){
        return this.usersService.remove(id)
    }
    
    

}
