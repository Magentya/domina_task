import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;
}

export class UpdateTaskDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  completed: boolean;
}
