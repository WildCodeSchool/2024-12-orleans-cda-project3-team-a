import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export const env = () =>
  dotenvExpand.expand(
    dotenv.config({
      path: ['.env.local', '.env'],
    }),
  );
