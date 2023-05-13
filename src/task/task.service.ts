import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { timeout, lastValueFrom } from 'rxjs';

import { Task } from '../db/models/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @Inject('MICRO_CHANNEL') private client: ClientProxy,
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

  validateToken(): Promise<number> {
    const pattern = { cmd: 'validate-token' };
    const payload =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xM1QwNTo1Mzo0NC41MTlaIiwidXBkYXRlZEF0IjoiMjAyMy0wNS0xM1QwNTo1Mzo0NC41MTlaIiwiZGVsZXRlZEF0IjpudWxsLCJ1c2VybmFtZSI6IiIsIm1haWwiOiJ5b0BtbWUuY29tIiwiaWF0IjoxNjgzOTM5NDE4LCJleHAiOjE2ODkxMjM0MTh9.rAmY7_eqtBmzIDKYqRT6OmIkBZJCl3sV9hDbaYLccn';
    return lastValueFrom(
      this.client.send(pattern, payload).pipe(timeout(5000)),
    );
  }

  async create(task: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save({
      description: task.description,
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
