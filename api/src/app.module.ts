import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodosModule, CategoryModule, AuthModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {}
