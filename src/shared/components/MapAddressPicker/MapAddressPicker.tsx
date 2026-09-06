import { useMemo } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import Button from '../Button';
import ScreenHeader from '../ScreenHeader';
import { LocateIcon, MapPinIcon } from '../icons';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './MapAddressPicker.styles';
import useMapAddressPicker from './useMapAddressPicker';
import type { MapAddressPickerProps } from './MapAddressPicker.types';

// Baku — sensible default center for an Azerbaijan-only delivery app,
// shown until (and unless) the user taps "locate me".
const DEFAULT_CENTER: [number, number] = [49.8671, 40.4093];
const DEFAULT_ZOOM = 11;
// OpenFreeMap — free vector tiles, no API key/billing account required
// (see the Google Maps discussion this replaced). Self-hostable if their
// public instance ever becomes a reliability concern.
const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

function MapAddressPicker({ visible, onClose, onSelect }: MapAddressPickerProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const { mapRef, cameraRef, resolving, locating, locateMe, confirmCenter } =
    useMapAddressPicker(onSelect, onClose);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.flex, { paddingTop: insets.top }]}>
        <ScreenHeader title={t('mapAddressPicker.title')} onBack={onClose} />

        <View style={styles.flex}>
          <Map ref={mapRef} mapStyle={MAP_STYLE_URL} style={styles.map} logo={false}>
            <Camera ref={cameraRef} initialViewState={{ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM }} />
            <UserLocation />
          </Map>
          <View style={styles.pinWrapper} pointerEvents="none">
            <MapPinIcon size={40} />
          </View>
          <TouchableOpacity
            style={styles.locateButton}
            onPress={locateMe}
            disabled={locating}
          >
            {locating ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <LocateIcon size={22} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <Text style={styles.hint}>{t('mapAddressPicker.hint')}</Text>
          <Button
            title={t('mapAddressPicker.confirm')}
            onPress={confirmCenter}
            loading={resolving}
          />
        </View>
      </View>
    </Modal>
  );
}

export default MapAddressPicker;
