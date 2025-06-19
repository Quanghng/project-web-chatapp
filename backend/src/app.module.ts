import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CsrfModule, ThreadModule, PrismaModule, UserModule, CommentModule } from './modules';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Request } from 'express';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // auto-generate schema
    context: ({ req }: { req: Request }) => ({ req }), // attach req to context for auth
  }), ConfigModule.forRoot({ isGlobal: true }), CsrfModule, AuthModule, UserModule, ThreadModule, CommentModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

