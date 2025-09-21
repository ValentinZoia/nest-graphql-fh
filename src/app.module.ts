import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

/*
  Apollo es una tecnologia para unificar la parte de graphql
  en diferentes servicios. Cuando se quiera conectar graphql desde
  angular, vue, react, etc. Se va a necesitar algun tipo de conector 
  especial para mandar los querys como graphql espera. Y uno de los
  mas comunes y utilizado es apollo

*/

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //code first
      playground: false, //para usar apollo sandbox
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // activar el nuevo landing page
    }),
    HelloWorldModule,
  ],
})
export class AppModule {}
