import {createServer} from 'http';
import app from './app/app';

const port = process.env.PORT || 5000;

const server =createServer(app);
server.listen(port, () => console.log(`server is listening to the port ${port}`));