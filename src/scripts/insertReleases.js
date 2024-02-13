const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = 'mongodb+srv://yaeeel:yaelencontraseña@spotifake.k4awa25.mongodb.net/?retryWrites=true&w=majority';

const releaseSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  single: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Release = mongoose.model('Release', releaseSchema);

const releasesToInsert = [
  {
    artist: 'siiiiii?',
    single: '500',
    imageUrl: '/canguro.jpg',
  },
];

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const insertReleases = async () => {
  try {
    for (const releaseData of releasesToInsert) {
      const newRelease = new Release(releaseData);
      await newRelease.save();
    }
    console.log('Todos los datos han sido insertados exitosamente');
  } catch (error) {
    console.error('Error insertando los datos:', error);
  } finally {
    mongoose.disconnect().then(() => console.log('MongoDB Disconnected'));
  }
};

insertReleases();
