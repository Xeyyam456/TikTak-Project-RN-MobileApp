import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import type { IconProps } from './icon.types';

export function MapPinIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.danger;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity={0.15}
      />
      <Circle cx={12} cy={10} r={2.5} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function LocateIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
      <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function MailIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={14} rx={2} stroke={color} strokeWidth={2} />
      <Path
        d="M3.5 6.5l8.5 6.5 8.5-6.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Brand marks below use a single well-known monochrome glyph path each,
// deliberately not composed freehand from primitives — a hand-drawn
// WhatsApp mark was tried twice and read as a "no entry" sign. See the
// CLAUDE.md gotcha before redrawing either of these.
export function WhatsAppIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.72.45 3.39 1.32 4.86L2 22l5.36-1.41c1.42.78 3.01 1.18 4.63 1.18h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.05 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm-4.16 4.7c-.15 0-.4.06-.61.29-.21.24-.8.78-.8 1.9s.82 2.2.94 2.35c.11.15 1.61 2.55 3.98 3.47 1.97.76 2.37.61 2.8.57.43-.04 1.38-.56 1.58-1.11.19-.54.19-1.01.13-1.11-.06-.09-.21-.15-.44-.26-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.15.24-.6.76-.74.91-.14.16-.27.18-.5.06-.24-.12-1-.37-1.91-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.29-.74-1.76-.19-.46-.39-.4-.53-.4h-.45z"
      />
    </Svg>
  );
}

export function FacebookIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path
        d="M13.5 19.5v-6.7h2.2l.35-2.6h-2.55v-1.6c0-.7.2-1.1 1.2-1.1h1.35V5.7c-.3 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H8.9v2.6h2.05v6.7h2.55z"
        fill={color}
      />
    </Svg>
  );
}
