import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

export class UpdateTaskDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  completed: boolean;
}
