import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  helloWord() {
    return 'hola querido!';
  }

  @Query(() => Float, {
    description: 'va a regresar un numero random',
    name: 'randomNumber',
  })
  random(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: 'va a regresar un numero del o al 10, excluyendo al 10',
    name: 'randomFrom0To',
  })
  getRandomFromZeroTo(): number {
    return Math.floor(Math.random() * 10);
  }

  @Query(() => Int, {
    description: 'va a regresar el doble de un numero, (default) 6',
    name: 'doble',
    defaultValue: 6,
  })
  multiplicaPor2(
    @Args('number', { nullable: true, type: () => Int }) number: number = 6,
  ): number {
    return number * 2;
  }
}
