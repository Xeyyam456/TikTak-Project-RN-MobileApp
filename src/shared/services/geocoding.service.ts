// Nominatim (OpenStreetMap's free geocoder) — no API key, but its usage
// policy requires a real identifying User-Agent and caps requests at ~1/sec.
// Only called once, on-demand, when the user taps "confirm" on the map
// picker, so this app's usage stays well within that.
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const params = new URLSearchParams({
    format: 'json',
    lat: String(lat),
    lon: String(lon),
    'accept-language': 'az',
  });
  const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
    headers: { 'User-Agent': 'TikTak-Mobile-App' },
  });
  if (!response.ok) {
    throw new Error(`Nominatim reverse geocode failed: ${response.status}`);
  }
  const data: { display_name?: string } = await response.json();
  if (!data.display_name) {
    throw new Error('No address found for this location');
  }
  return data.display_name;
}
