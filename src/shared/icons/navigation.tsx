import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import type { IconProps } from './icon.types';

export function HomeIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SearchIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <Path
        d="M20.5 20.5L16 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function UserIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path
        d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function GridIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={8} height={8} rx={2} fill={color} />
      <Rect x={13} y={3} width={8} height={8} rx={2} fill={color} />
      <Rect x={3} y={13} width={8} height={8} rx={2} fill={color} />
      <Rect x={13} y={13} width={8} height={8} rx={2} fill={color} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5l7 7-7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowLeftIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 5l-7 7 7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
