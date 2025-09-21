import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  completed: boolean;
}

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => String)
  id: string;
}
