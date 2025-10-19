import express, { type Request, type Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World Server!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World Client!' });
});

export default router;
