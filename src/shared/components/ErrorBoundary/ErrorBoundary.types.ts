import type { ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  error: Error | null;
  resetKey: number;
};

export type ErrorBoundaryFallbackProps = {
  error: Error;
  onRetry: () => void;
};
