const { app, apolloServer } = require('./../index.js');
const debug = require('debug')('react-fs-demo:server');
const http = require('http');

/**
 * Listen on provided port, on all network interfaces.
 */


// Database
const connectDb = require('../db');

const port = process.env.PORT || 4000;

connectDb().then(async () => {
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
  )
  app.on('error', onError);
  app.on('listening', onListening);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
