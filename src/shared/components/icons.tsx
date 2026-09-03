import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';

type IconProps = {
  size?: number;
  color?: string;
};

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

export function EyeIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-7 10-7c1.77 0 3.29.5 4.56 1.19M22 12s-3.5 7-10 7c-1.77 0-3.29-.5-4.56-1.19M9.9 9.9a3 3 0 104.2 4.2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M2 2l20 20" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ImageIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={3} stroke={color} strokeWidth={2} />
      <Circle cx={8.5} cy={9} r={1.5} stroke={color} strokeWidth={2} />
      <Path
        d="M21 15l-5.5-5.5a1 1 0 00-1.4 0L4 19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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

export function HeartIcon({
  size = 24,
  color: colorProp,
  filled = false,
}: IconProps & { filled?: boolean }) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"
        fill={filled ? color : 'none'}
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

export function TrashIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m3 0l-.867 12.142A2 2 0 0115.138 21H8.862a2 2 0 01-1.995-1.858L6 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 11v6M14 11v6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 13l4 4L19 7"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CloseIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 6l12 12M18 6L6 18"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AlertIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 7v6" stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Circle cx={12} cy={17} r={1.5} fill={color} />
    </Svg>
  );
}

export function DocumentIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 3v5h5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9 13h6M9 17h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ClockIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path
        d="M12 7v5l3.5 2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LogoutIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21H5a1 1 0 01-1-1V4a1 1 0 011-1h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 17l5-5-5-5M21 12H9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CartIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={8} cy={21} r={1} stroke={color} strokeWidth={2} />
      <Circle cx={19} cy={21} r={1} stroke={color} strokeWidth={2} />
      <Path
        d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
      <Path
        d="M19.4 13a7.97 7.97 0 000-2l2.02-1.57a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.6-.22l-2.38.96a7.93 7.93 0 00-1.73-1l-.36-2.53a.5.5 0 00-.5-.43h-3.84a.5.5 0 00-.5.43l-.36 2.53a7.93 7.93 0 00-1.73 1l-2.38-.96a.5.5 0 00-.6.22L2.66 8.79a.5.5 0 00.12.64L4.8 11a7.97 7.97 0 000 2l-2.02 1.57a.5.5 0 00-.12.64l1.92 3.32a.5.5 0 00.6.22l2.38-.96c.53.42 1.11.76 1.73 1l.36 2.53a.5.5 0 00.5.43h3.84a.5.5 0 00.5-.43l.36-2.53a7.93 7.93 0 001.73-1l2.38.96a.5.5 0 00.6-.22l1.92-3.32a.5.5 0 00-.12-.64L19.4 13z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

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
