import express from 'express';
import UserService from './userService';

class UserRoutes {
  constructor() {
    const router = new express.Router();
    const service = new UserService();

    // Facade Pattern
    this.initRoutes = (server) => {
      server.use('/oapi', router);

      router.post('/login', service.login);
      router.post('/signup', service.signup);
      router.post('/validateToken', service.validateToken);
      router.post('/forgotPassword', service.forgotPassword);
    };
  }
}

export default UserRoutes;
