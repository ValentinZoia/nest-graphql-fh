import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  completed: boolean;
}

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Field(() => String)
  id: string;
}
