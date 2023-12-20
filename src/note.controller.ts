import { IncomingMessage, ServerResponse } from 'http';
import { notes, writeDataFile, INote } from './note.model';

export const getAllNotes = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(notes));
};

export const getNoteById = (req: IncomingMessage, res: ServerResponse, noteId: string | undefined) => {
  if (noteId) {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(note));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Note not found' }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid request' }));
  }
};

const generateRandomNumber = (): number => Math.floor(Math.random() * 1000000);

export const createNote = (req: IncomingMessage, res: ServerResponse) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    try {
      const { title, content } = JSON.parse(data);
      const newNote: INote = {
        id: generateRandomNumber().toString(),
        title,
        content,
      };
      notes.push(newNote);
      writeDataFile(notes);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newNote));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid request body' }));
    }
  });
};

export const updateNote = (req: IncomingMessage, res: ServerResponse, noteId: string | undefined) => {
  if (noteId) {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {

      const { title, content } = JSON.parse(data);
      const index = notes.findIndex((n) => n.id === noteId);

      if (index !== -1) {
        notes[index] = { ...notes[index], title, content };
        writeDataFile(notes);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(notes[index]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Note not found' }));
      }
    });
  }
};

export const deleteNote = (req: IncomingMessage, res: ServerResponse, noteId: string | undefined) => {
  if (noteId) {
    const index = notes.findIndex((n) => n.id === noteId);

    if (index !== -1) {
      notes.splice(index, 1);
      writeDataFile(notes);

      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Note not found' }));
    }
  }
};