import { Request, Response } from 'express';
import mongoose from 'mongoose';

const releaseSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  single: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Release = mongoose.models.Release || mongoose.model('Release', releaseSchema);

export const longPollingController = async (req: Request, res: Response) => {
  let lastRelease = await Release.findOne().sort({ _id: -1 });
  
  const checkForLatestRelease = setInterval(async () => {
    const latestRelease = await Release.findOne().sort({ _id: -1 });

    if (latestRelease && (!lastRelease || latestRelease._id.toString() !== lastRelease._id.toString())) {
      clearInterval(checkForLatestRelease);
      lastRelease = latestRelease;
      res.json(latestRelease);
    }
  }, 2000);

  setTimeout(() => {
    clearInterval(checkForLatestRelease);
    if (!res.headersSent) {
      res.status(204).send();
    }
  }, 30000);
};
