import { Module } from '@nestjs/common';
import { NoteController } from './ note.controller';
import { DatabaseModule } from '@/infra/database/database.module';

import { CreateNoteUseCase } from '@/modules/note/useCases/createNote/createNote.useCase';
import { EditNoteUseCase } from '@/modules/note/useCases/editNote/editNote.useCase';
import { DeleteNoteUseCase } from '@/modules/note/useCases/deleteNote/deleteNote.useCase';
import { GetManyUseCase } from '@/modules/note/useCases/getMany/getMany.useCase';
import { GetNoteUseCase } from '@/modules/note/useCases/getNote/getNote.useCase';

@Module({
    controllers: [NoteController],
    providers: [
        CreateNoteUseCase,
        EditNoteUseCase,
        DeleteNoteUseCase,
        GetNoteUseCase,
        GetManyUseCase
    ],
    imports: [DatabaseModule]
})
export class NoteModule { };