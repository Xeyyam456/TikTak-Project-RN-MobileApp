import { Component } from 'react';
import { Text, View } from 'react-native';
import Button from '../Button';
import { styles } from './ErrorBoundary.styles';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Nəsə səhv getdi</Text>
          <Text style={styles.message}>
            Tətbiqdə gözlənilməz xəta baş verdi. Yenidən cəhd edin.
          </Text>
          {__DEV__ ? (
            <Text style={styles.debug}>
              {this.state.error.message}
              {'\n'}
              {this.state.error.stack}
            </Text>
          ) : null}
          <Button title="Yenidən cəhd et" onPress={this.handleRetry} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
