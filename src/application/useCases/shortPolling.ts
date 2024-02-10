import { Release } from '../../domain/entities/release';

export const getUpcomingReleases = async () => {
  try {
    const releases = await Release.find();
    return releases;
  } catch (error) {
    console.error('Error fetching releases from DB:', error);
    throw error;
  }
};
