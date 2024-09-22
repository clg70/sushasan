import dotev from 'dotenv';
dotev.config();
import express from 'express';
import cors from 'cors';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory, canisterId } from '../backend/index.js';
import user from './routes/user.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Create HttpAgent for development environment
const host = 'http://127.0.0.1:4943'; // Local development host
const agent = new HttpAgent({ host });

if (host === 'http://127.0.0.1:4943') {
  agent
    .fetchRootKey()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
}

export const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: 'ahw5u-keaaa-aaaaa-qaaha-cai',
});

app.get('/register', async (req, res) => {
  try {
    console.log(req);
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running at port 5000.');
});
