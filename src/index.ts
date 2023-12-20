import http from 'http';
import { noteRoutes } from './note.routes';

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Handle the incoming request from the Routes
  noteRoutes(req, res);
});

// Expose a port on which the server will listen
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
