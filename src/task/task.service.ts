import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from '../db/models/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async create(task: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save({
      description: task.description,
      title: task.title,
      user: {
        id: task.id,
      },
    });
  }

  async update(id: number, data: UpdateTaskDto): Promise<UpdateResult> {
    return await this.taskRepository.update(id, { ...data });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.softDelete(id);
  }
}
