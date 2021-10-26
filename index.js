const http = require('http');
const { getTasks, addTask, updateTask } = require('./model/todolist-services');

const requestListener = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.setHeader('Allow', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  console.log(req.method);

  if (req.method === 'GET') {
    switch (req.url) {
      case '/':
        res.end('app tasks');
        break;
      case '/tasks':
        res.end(await getTasks());
        break;
      default:
        res.end('error 404 pagina no encontrada');
        break;
    }
  } else if (req.method === 'POST') {
    console.log('petición post');
    switch (req.url) {
      case '/tasks':
        // Obtenemos los datos que me está enviando el cliente
        // eslint-disable-next-line no-case-declarations
        let body = '';
        // Evento data -> se dispara cuando un cliente está enviando datos hacía el servidor
        req.on('data', (data) => {
          body += data.toString();
        });

        req.on('end', async () => {
          // Finalizo la entrega / envio de datos por parte del cliente
          const taskObj = JSON.parse(body);
          await addTask(taskObj);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              message: 'Se ha agregado la tarea en el sistema',
            })
          );
        });

        break;
      default:
        break;
    }
  } else if (req.method === 'PUT') {
    let body = '';
    switch (req.url) {
      case '/tasks':
        // Obtenemos los datos que me está enviando el cliente
        // Evento data -> se dispara cuando un cliente está enviando datos hacía el servidor
        req.on('data', (data) => {
          body += data.toString();
        });

        req.on('end', async () => {
          // Finalizo la entrega / envio de datos por parte del cliente
          const taskObj = JSON.parse(body);
          await updateTask(taskObj);
          req.writeHead(201, { 'Content-Type': 'application/json' });
          req.end(
            JSON.stringify({
              message: 'Se ha actualizado la tarea en el sistema',
            })
          );
        });

        break;
      default:
        break;
    }
  } else if (req.method === 'DELETE') {
    switch (req.url) {
      case '/tasks/:id':
        // eliminar tarea
        break;
      default:
        break;
    }
  }
};

http.createServer(requestListener).listen(8000);
