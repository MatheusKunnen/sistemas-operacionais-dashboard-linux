import express from 'express';
import cors from 'cors';
import os from 'os';
import morgan from 'morgan';
import LocalConfig from './config/LocalConfig';
import AuthManager from './utils/AuthManager';
import UserRoute from './routes/UserRoute';
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFoundHandler';
import SystemConfigRoute from './routes/SystemConfigRoute';

export default class Server {
  private app: express.Application;
  private localConfig: LocalConfig;

  constructor(configFile: string) {
    this.localConfig = new LocalConfig(configFile);
    AuthManager.setDefault(
      new AuthManager(
        this.localConfig.getPasswordSecret(),
        this.localConfig.getJwtSecret()
      )
    );
    this.app = express();
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json({ limit: '50mb' }));

    this.initEndpoints();

    this.app.use(errorHandler());
    this.app.use(notFoundHandler());
  }

  private initEndpoints() {
    const systemConfigRoute = new SystemConfigRoute(
      this.app,
      this.localConfig.getApiHome()
    );
    systemConfigRoute.initRouter();

    // User router
    const userRoute = new UserRoute(this.app, this.localConfig.getApiHome());
    userRoute.initRouter();
  }

  public start() {
    this.app.listen(this.localConfig.getApiPort(), () => {
      console.log(
        `Server running on ${
          os.hostname
        }:${this.localConfig.getApiPort()}${this.localConfig.getApiHome()}`
      );
    });
  }
}
