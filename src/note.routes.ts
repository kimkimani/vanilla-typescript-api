import { IncomingMessage, ServerResponse } from 'http';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from './note.controller';

// Route handling for notes
export const noteRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // Handle GET request to retrieve all notes
  if (method === 'GET' && url === '/api/notes') {
    getAllNotes(req, res);
  }
  // POST request to create a new note
  else if (method === 'POST' && url === '/api/notes') {
    createNote(req, res);
  }
  // GET a single note
  else if (method === 'GET' && url && url.match(/\/api\/notes\/([\w-]+)/)) {
    const [, noteId] = url.match(/\/api\/notes\/([\w-]+)/) || [];
    getNoteById(req, res, noteId);
  }
  // Update a note
  else if (method === 'PUT' && url && url.match(/\/api\/notes\/([\w-]+)/)) {
    const [, noteId] = url.match(/\/api\/notes\/([\w-]+)/) || [];
    updateNote(req, res, noteId);
  }
  // Create DELETE request to delete note by ID
  else if (method === 'DELETE' && url && url.match(/\/api\/notes\/([\w-]+)/)) {
    const [, noteId] = url.match(/\/api\/notes\/([\w-]+)/) || [];
    deleteNote(req, res, noteId);
  }
  // Handle unmatched routes with a 404 Not Found response
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};
