import { z } from 'zod';

const urlSchema = z.object({
  url: z.string().url().refine(
    (url) => url.includes('youtube.com') || url.includes('youtu.be'),
    'Invalid YouTube URL'
  )
});






export function validateUrl(req, res, next) {
  try {
    urlSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Invalid URL',
      details: error.errors 
    });
  }
}