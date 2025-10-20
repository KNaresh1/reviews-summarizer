import { type Request, type Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      // Parse request
      const productId = Number(req.params.id);

      // Validate request data
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID.' });
         return;
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         res.status(400).json({ error: 'Product does not exist.' });
         return;
      }

      // Make service call
      const reviews = await reviewRepository.getReviews(productId);

      const summary = await reviewRepository.getReviewSummary(productId);

      // Return results
      res.json({ summary, reviews });
   },

   async summarizeReviews(req: Request, res: Response) {
      // Parse request
      const productId = Number(req.params.id);

      // Validate request data
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID.' });
         return;
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         res.status(400).json({ error: 'Invalid product.' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId, 1);
      if (!reviews.length) {
         res.status(400).json({
            error: 'There are no reviews to summarize for this product.',
         });
         return;
      }

      // Make service call
      const summary = await reviewService.summarizeReviews(productId);

      // Return results
      res.json({ summary });
   },
};
