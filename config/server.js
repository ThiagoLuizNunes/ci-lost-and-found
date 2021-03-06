import bodyParser from 'body-parser';
import queryParser from 'express-query-int';
import express from 'express';
import allowCors from './cors';
import auth from '../config/auth';

import ApiFactoryRoutes from '../api/apiFactoryRoutes';

// Singleton Pattern
let port = 4000;
const server = express();

/**
 * Start Express server at the port choosed
 * @param {number} port 8080
 */
const initServer = (p) => {
  port = p;
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(allowCors);
  server.use(queryParser());

  server.listen(process.env.PORT || port, () => console.log('Listening on: ', port));
};

/**
 * Starts all the routes of each entity
 * in the Express server
 */
const initRoutes = () => { // Facade Pattern
  const apiFactory = new ApiFactoryRoutes();

  const userRegisterRoutes = apiFactory.createRoutesClass('register');
  userRegisterRoutes.initRoutes(server);

  const itemPostRoutes = apiFactory.createRoutesClass('post');
  itemPostRoutes.initRoutes(server, auth.protect);
};

/**
 * Get Express server port
 * @return {number}
 */
const getPort = () => port;

/**
 * Get Express server instance
 * @return {Express}
 */

const getServer = () => server;
/**
 * Set Express server port
 * @param {number}
 */
const setPort = (newport) => {
  port = newport;
};

export default { initServer, initRoutes, getServer, getPort, setPort };
