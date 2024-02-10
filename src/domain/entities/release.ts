import mongoose from 'mongoose';

const releaseSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  single: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Release = mongoose.model('Release', releaseSchema);
