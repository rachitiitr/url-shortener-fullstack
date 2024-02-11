import express, { Request, Response } from 'express';
import sequelize from './sequelize';
import Url from './models/url';
import shortid from 'shortid';

const app = express();
const PORT = 3000;

// Sync the Sequelize models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/:shortCode', async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await Url.findOne({ where: { shortCode } });

    if (url) {
      // Redirect to the original URL
      return res.redirect(url.originalUrl);
    } else {
      // If short code not found, return a 404 error
      return res.status(404).send('Not Found');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});


app.post('/shorten', async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  // Generate a short code (you may use a library for this)
  const shortCode = generateShortCode();

  try {
    // Create a new URL entry in the database
    const url = await Url.create({ originalUrl, shortCode });

    res.json({ shortUrl: `http://localhost:3000/${url.shortCode}` });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function generateShortCode() {
  return shortid.generate();
}
