import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  LocationManager,
  Map,
  UserLocation,
  type CameraRef,
  type MapRef,
} from '@maplibre/maplibre-react-native';
import Button from '../Button';
import ScreenHeader from '../ScreenHeader';
import { LocateIcon, MapPinIcon } from '../icons';
import { reverseGeocode } from '@shared/services/geocoding.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast } from '@shared/utils/toast';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './MapAddressPicker.styles';
import type { MapAddressPickerProps } from './MapAddressPicker.types';

// Baku — sensible default center for an Azerbaijan-only delivery app,
// shown until (and unless) the user taps "locate me".
const DEFAULT_CENTER: [number, number] = [49.8671, 40.4093];
const DEFAULT_ZOOM = 11;
const LOCATE_ZOOM = 15;
// OpenFreeMap — free vector tiles, no API key/billing account required
// (see the Google Maps discussion this replaced). Self-hostable if their
// public instance ever becomes a reliability concern.
const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

function MapAddressPicker({ visible, onClose, onSelect }: MapAddressPickerProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);
  const [resolving, setResolving] = useState(false);
  const [locating, setLocating] = useState(false);

  async function handleLocateMe() {
    setLocating(true);
    try {
      const granted = await LocationManager.requestPermissions();
      if (!granted) {
        showErrorToast(t('mapAddressPicker.locationPermissionDenied'));
        return;
      }
      const position = await LocationManager.getCurrentPosition();
      if (!position) {
        showErrorToast(t('mapAddressPicker.locationUnavailable'));
        return;
      }
      cameraRef.current?.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: LOCATE_ZOOM,
        duration: 800,
      });
    } catch (error) {
      showErrorToast(getApiErrorMessage(error));
    } finally {
      setLocating(false);
    }
  }

  async function handleConfirm() {
    if (!mapRef.current) return;
    setResolving(true);
    try {
      const [lon, lat] = await mapRef.current.getCenter();
      const address = await reverseGeocode(lat, lon);
      onSelect(address);
      onClose();
    } catch (error) {
      showErrorToast(getApiErrorMessage(error));
    } finally {
      setResolving(false);
    }
  }

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
            onPress={handleLocateMe}
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
            onPress={handleConfirm}
            loading={resolving}
          />
        </View>
      </View>
    </Modal>
  );
}

export default MapAddressPicker;
