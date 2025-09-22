import { Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

export class StatusArgs {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
