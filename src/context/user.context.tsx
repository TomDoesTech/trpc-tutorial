import { inferProcedureOutput } from '@trpc/server';
import { createContext, ReactNode } from 'react';
import { AppRouter } from '../server/route/app.router';

type TQuery = keyof AppRouter['_def']['queries'];
type InferQueryOutput<TRoute extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRoute]
>;

const UserContext = createContext<InferQueryOutput<'users.me'>>(null);

export const UserContextProvider = ({
  value,
  children,
}: {
  value: InferQueryOutput<'users.me'> | undefined;
  children: ReactNode;
}) => {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
};
