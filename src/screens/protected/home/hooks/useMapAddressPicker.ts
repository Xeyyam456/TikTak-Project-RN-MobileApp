import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LocationManager,
  type CameraRef,
  type MapRef,
} from '@maplibre/maplibre-react-native';
import { reverseGeocode } from '@shared/services/geocoding.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast } from '@shared/utils/toast';

const LOCATE_ZOOM = 15;

/**
 * Map refs plus the two async actions behind them: flying the camera to the
 * device's GPS position, and reverse-geocoding whatever the fixed centre pin
 * is currently over.
 */
export default function useMapAddressPicker(
  onSelect: (address: string) => void,
  onClose: () => void,
) {
  const { t } = useTranslation();
  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);
  const [resolving, setResolving] = useState(false);
  const [locating, setLocating] = useState(false);

  async function locateMe() {
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

  async function confirmCenter() {
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

  return { mapRef, cameraRef, resolving, locating, locateMe, confirmCenter };
}
