import dayjs from 'dayjs';
import type { Review } from '../generated/prisma';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const reviewRepository = {
   getReviews(productId: number, limit?: number): Promise<Review[]> {
      // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },

   storeReviewSummary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'days').toDate();

      const data = {
         productId,
         content: summary,
         generatedAt: now,
         expiresAt,
      };

      return prisma.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },

   async getReviewSummary(productId: number): Promise<string | null> {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [{ productId }, { expiresAt: { gt: new Date() } }],
         },
      });

      return summary ? summary.content : null;
   },
};
