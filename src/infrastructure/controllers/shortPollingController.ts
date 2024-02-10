import { Request, Response } from 'express';
import { getUpcomingReleases } from '../../application/useCases/shortPolling';

export const upcomingReleasesController = async (req: Request, res: Response) => {
  try {
    const releases = await getUpcomingReleases();
    res.json(releases);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching releases' });
  }
};
