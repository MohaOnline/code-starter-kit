import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma.js';

export async function GET() {
  try {
    const note = await prisma.notebooks_notes.findUnique({
      where: { id: 1 },
      select: {
        id: true,
        title: true,
        body: true,
      },
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    const serializedNote = {
      ...note,
      id: note.id.toString()
    };
    return NextResponse.json(serializedNote);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, body } = await request.json();

    const updatedNote = await prisma.notebooks_notes.update({
      where: { id: 1 },
      data: { body },
      select: {
        id: true,
        title: true,
        body: true,
      },
    });

    const serializedNote = {
      ...updatedNote,
      id: updatedNote.id.toString()
    };
    return NextResponse.json(serializedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}