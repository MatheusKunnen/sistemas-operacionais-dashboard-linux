import express from 'express';
import SystemConfigController from '../controllers/SystemConfigController';
import asyncHandler from '../middleware/asyncHandler';
import useUser from '../middleware/useUser';
import Route from './Route';

export default class SystemConfigRoute extends Route {
  controller: SystemConfigController;
  constructor(app: express.Application, appHome: string) {
    super('/system', app, appHome);
    this.controller = new SystemConfigController();
    this.loadRouter();
  }

  loadRouter(): void {
    // this.router.post('/', asyncHandler(this.controller.create));
    this.router.get(
      '/info',
      // useUser(true),
      asyncHandler(this.controller.getSystemInformation)
    );
    this.router.get(
      '/disk',
      // useUser(true),
      asyncHandler(this.controller.getDiskInformation)
    );
    this.router.get(
      '/memory',
      // useUser(true),
      asyncHandler(this.controller.getMemoryInformation)
    );
    this.router.get(
      '/cpu',
      // useUser(true),
      asyncHandler(this.controller.getProcessorInformation)
    );
  }
}
