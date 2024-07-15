import { AppRouter } from '../server/router';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
    };
  },
});
