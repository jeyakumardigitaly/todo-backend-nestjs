import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './modules/todo/todo.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig, authConfig],
    }),
    DatabaseModule,
    TodoModule,
    UsersModule,
    AuthModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
