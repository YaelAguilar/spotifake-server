import { Request, Response } from 'express';
import { getUpcomingReleases } from '../../application/useCases/getUpcomingReleases';

export const upcomingReleasesController = (req: Request, res: Response) => {
  const releases = getUpcomingReleases();
  res.json(releases);
};
