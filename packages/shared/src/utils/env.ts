import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export const env = () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenvExpand.expand(
      dotenv.config({
        path: ['.env.local', '.env'],
      }),
    );
  }
};
