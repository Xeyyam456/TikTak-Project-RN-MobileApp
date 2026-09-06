import { Component, Fragment, type ErrorInfo } from 'react';
import * as Sentry from '@sentry/react-native';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null, resetKey: 0 };

  static getDerivedStateFromError(error: Error): Pick<ErrorBoundaryState, 'error'> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
  }

  // Clearing just `error` re-renders the exact same children with whatever
  // state caused the crash still intact, so a crash rooted in bad state
  // (not a one-off render glitch) would reproduce immediately. Bumping
  // `resetKey` forces React to fully unmount and remount the subtree below,
  // discarding that bad state (navigation resets to its initial route too).
  handleRetry = () => {
    this.setState(({ resetKey }) => ({ error: null, resetKey: resetKey + 1 }));
  };

  render() {
    if (this.state.error) {
      return <ErrorBoundaryFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return <Fragment key={this.state.resetKey}>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
