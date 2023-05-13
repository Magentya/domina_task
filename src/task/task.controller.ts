import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import to from 'await-to-js';
import { UseZodGuard } from 'nestjs-zod';

import { TaskService } from './task.service';
import { IGeneralResponse } from 'src/utils/general_types';
import { CreateTaskSchema, UpdateTaskSchema } from './task.zod';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UseZodGuard('body', CreateTaskSchema)
  async create(@Body() data: CreateTaskDto): Promise<IGeneralResponse> {
    const [err, task] = await to(this.taskService.create(data));

    if (err) {
      throw new HttpException(
        {
          error: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: 201,
      message: 'Task created successfully',
      data: task,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getAll(@Param('id') id: number): Promise<IGeneralResponse> {
    const [err, task] = await to(this.taskService.findAll(id));

    if (err) {
      throw new HttpException(
        {
          error: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: 200,
      message: 'Get asks successfully',
      data: task,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseZodGuard('body', UpdateTaskSchema)
  async update(
    @Param('id') id: number,
    @Body() data: UpdateTaskDto,
  ): Promise<IGeneralResponse> {
    const [err, response] = await to(this.taskService.update(id, data));

    if (err) {
      throw new HttpException(
        {
          error: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: 200,
      message: 'Task updated successfully',
      data: response,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number): Promise<IGeneralResponse> {
    const [err, response] = await to(this.taskService.delete(id));

    if (err) {
      throw new HttpException(
        {
          error: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: 200,
      message: 'Task deleted successfully',
      data: response,
    };
  }
}
