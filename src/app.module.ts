import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { UserModule } from '@infra/http/modules/user/user.module';
import { AuthModule } from '@infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { NoteModule } from './infra/http/modules/note/note.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, NoteModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}