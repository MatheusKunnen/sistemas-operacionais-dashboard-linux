import express from 'express';
import UserController from '../controllers/UserController';
import asyncHandler from '../middleware/asyncHandler';
import useUser from '../middleware/useUser';
import Route from './Route';

export default class UserRoute extends Route {
  controller: UserController;
  constructor(app: express.Application, appHome: string) {
    super('/user', app, appHome);
    this.controller = new UserController();
    this.loadRouter();
  }

  loadRouter(): void {
    // this.router.post('/', asyncHandler(this.controller.create));
    this.router.post(
      '/login',
      useUser(true),
      asyncHandler(this.controller.login)
    );
    this.router.get('/me', useUser(false), asyncHandler(this.controller.getMe));
  }
}
