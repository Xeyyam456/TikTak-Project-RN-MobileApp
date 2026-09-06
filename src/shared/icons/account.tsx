import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import type { IconProps } from './icon.types';

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

export function HelpIcon({ size = 24, color: colorProp }: IconProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path
        d="M9.5 9.3a2.5 2.5 0 114 2c-.6.5-1.5 1-1.5 2.2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={17} r={1.1} fill={color} />
    </Svg>
  );
}
