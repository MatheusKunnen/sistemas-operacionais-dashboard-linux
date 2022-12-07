import { UserModel } from '../../src/model/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
