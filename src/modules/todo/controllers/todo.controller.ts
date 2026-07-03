import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, UseGuards } from "@nestjs/common";

import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { TodoService } from "../services/todo.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth-guard";


@Controller('todos')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body() dto: CreateTodoDto,
    ) {
        return this.todoService.create(dto)
    }

    @Get()
    findAll() {
        return this.todoService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTodoDto) {
        return this.todoService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.remove(id);
    }
}