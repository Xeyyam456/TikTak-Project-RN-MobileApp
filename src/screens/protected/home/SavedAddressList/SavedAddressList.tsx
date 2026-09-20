import { ScrollView } from 'react-native';
import SavedAddressRow from '../SavedAddressRow';
import { styles } from './SavedAddressList.styles';
import type { SavedAddressListProps } from './SavedAddressList.types';

function SavedAddressList({ addresses, onSelect }: SavedAddressListProps) {
  if (addresses.length === 0) return null;

  return (
    <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
      {addresses.map(address => (
        <SavedAddressRow
          key={address}
          address={address}
          onPress={() => onSelect(address)}
        />
      ))}
    </ScrollView>
  );
}

export default SavedAddressList;
