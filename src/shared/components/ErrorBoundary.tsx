import { Component, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { FONTS } from '../../theme/fonts';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

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
          <Button title="Yenidən cəhd et" onPress={this.handleRetry} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    fontFamily: FONTS.regular,
    marginBottom: 12,
  },
});

export default ErrorBoundary;
