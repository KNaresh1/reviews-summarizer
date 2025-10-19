import { type Request, type Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      // Parse request
      const productId = Number(req.params.id);

      // Validate request data
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID' });
         return;
      }

      // Make service call
      const reviews = await reviewService.getReviews(productId);

      // Return results
      res.json(reviews);
   },

   async summarizeReviews(req: Request, res: Response) {
      // Parse request
      const productId = Number(req.params.id);

      // Validate request data
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID' });
         return;
      }

      // Make service call
      const summary = await reviewService.summarizeReviews(productId);

      // Return results
      res.json({ summary });
   },
};
