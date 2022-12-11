import { Request, Response } from 'express';
import SystemInfo from '../SystemInfo';

export default class SystemConfigController {
  public async getSystemInformation(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    // if (req.user === undefined) throw new ErrorResponse('Invalid user', 401);
    const info = new SystemInfo();
    const data = await info.getSystemInformation();
    res.status(200).json({ data });
    return;
  }

  public async getDiskInformation(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    // if (req.user === undefined) throw new ErrorResponse('Invalid user', 401);
    const info = new SystemInfo();
    const data = await info.getDiskInformations();
    res.status(200).json({ data });
    return;
  }

  public async getMemoryInformation(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    // if (req.user === undefined) throw new ErrorResponse('Invalid user', 401);
    const info = new SystemInfo();
    const data = await info.getMemoryInformation();
    res.status(200).json({ data });
    return;
  }

  public async getProcessorInformation(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    // if (req.user === undefined) throw new ErrorResponse('Invalid user', 401);
    const info = new SystemInfo();
    const data = await info.getProcessorInformation();
    res.status(200).json({ data });
    return;
  }

  public async getDiskIOInformation(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    // if (req.user === undefined) throw new ErrorResponse('Invalid user', 401);
    const info = new SystemInfo();
    const data = await info.getDiskIOInformation();
    res.status(200).json({ data });
    return;
  }
}
