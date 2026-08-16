import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../../../theme/fonts';

function SearchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      <Text style={styles.title}>Axtarış</Text>
      <Text style={styles.placeholder}>Tezliklə burada olacaq</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  placeholder: {
    marginTop: 12,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
});

export default SearchScreen;
