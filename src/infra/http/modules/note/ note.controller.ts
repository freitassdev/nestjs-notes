import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';

import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequest.model';
import { CreateNoteDTO } from './dto/createNote.dto';
import { NoteViewModel } from './viewModel/noteViewModel';

import { CreateNoteUseCase } from '@/modules/note/useCases/createNote/createNote.useCase';
import { EditNoteUseCase } from '@/modules/note/useCases/editNote/editNote.useCase';
import { DeleteNoteUseCase } from '@/modules/note/useCases/deleteNote/deleteNote.useCase';
import { GetManyUseCase } from '@/modules/note/useCases/getMany/getMany.useCase';
import { GetNoteUseCase } from '@/modules/note/useCases/getNote/getNote.useCase';
import { EditNoteDTO } from './dto/editNote.dto';

@Controller('notes')
export class NoteController {
    constructor(
        private readonly createNoteUseCase: CreateNoteUseCase,
        private readonly editNoteUseCase: EditNoteUseCase,
        private readonly deleteNoteUseCase: DeleteNoteUseCase,
        private readonly getNoteUseCase: GetNoteUseCase,
        private readonly getManyUseCase: GetManyUseCase
    ) { }

    @Post("create")
    async createNote(
        @Request() request: AuthenticatedRequestModel,
        @Body() body: CreateNoteDTO
    ) {
        const { title, description } = body;
        const note = await this.createNoteUseCase.run({
            title,
            description,
            userId: request.user.id
        })
        return NoteViewModel.toHttp(note);
    }

    @Put("edit/:noteId")
    async editNote(
        @Request() request: AuthenticatedRequestModel,
        @Param('noteId') noteId: string,
        @Body() body: EditNoteDTO
    ) {
        const { title, description } = body;
        const note = await this.editNoteUseCase.run({
            title,
            description,
            userId: request.user.id,
            noteId
        })
        return NoteViewModel.toHttp(note);
    }

    @Delete("delete/:noteId")
    async deleteNote(
        @Request() request: AuthenticatedRequestModel,
        @Param('noteId') noteId: string
    ) {
        await this.deleteNoteUseCase.run({
            noteId,
            userId: request.user.id,
        })
    }

    @Get("get/:noteId")
    async getNote(
        @Request() request: AuthenticatedRequestModel,
        @Param('noteId') noteId: string
    ) {
        const note = await this.getNoteUseCase.run({
            noteId,
            userId: request.user.id
        })
        return NoteViewModel.toHttp(note);
    }

    @Get("get-many")
    async getMany(
        @Request() request: AuthenticatedRequestModel,
        @Query('page') page: string,
        @Query('perPage') perPage: string
    ) {
        const notes = await this.getManyUseCase.run({
            userId: request.user.id,
            page,
            perPage
        })
        return notes.map(note => NoteViewModel.toHttp(note));
    }
}