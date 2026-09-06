import { Circle, Path } from 'react-native-svg';

// Small generic fruit silhouettes used only as pieces "poured" into the
// splash's line-drawn basket — plain shapes, not a redraw of the app's
// actual bootsplash logo mark. Each is defined around its own local
// center (see each FRUITS entry's cx/cy in AnimatedSplashScreen.tsx) so
// the falling animation can translate+rotate it as a group.

export function AppleShape() {
  return (
    <>
      <Path
        d="M16 12c-5 0-9 4-9 10s4 8 8 8 2-1 3-1 2 1 3 1c4 0 8-3 8-9 0-6-4-9-8-9-1 0-2 .5-3 1s-1.5-1-2-1z"
        fill="#E24C4C"
      />
      <Path d="M16 12V6" stroke="#5C4033" strokeWidth={2} strokeLinecap="round" />
      <Path d="M16 8c2-3 5-3 6-2" stroke="#4C8C4A" strokeWidth={2} strokeLinecap="round" fill="none" />
    </>
  );
}

export function OrangeShape() {
  return (
    <>
      <Circle cx={16} cy={17} r={11} fill="#FFA726" />
      <Path d="M16 6v4" stroke="#4C8C4A" strokeWidth={2} strokeLinecap="round" />
    </>
  );
}

export function BananaShape() {
  return <Path d="M3 20c10 4 26 2 34-14-2 10-14 20-30 18a5 5 0 01-4-4z" fill="#F4D03F" />;
}

export function GrapesShape() {
  return (
    <>
      <Path d="M15 2v6" stroke="#4C8C4A" strokeWidth={2} strokeLinecap="round" />
      <Circle cx={15} cy={12} r={3.5} fill="#8E5CB0" />
      <Circle cx={10} cy={17} r={3.5} fill="#8E5CB0" />
      <Circle cx={20} cy={17} r={3.5} fill="#8E5CB0" />
      <Circle cx={8} cy={23} r={3.5} fill="#8E5CB0" />
      <Circle cx={15} cy={23} r={3.5} fill="#8E5CB0" />
      <Circle cx={22} cy={23} r={3.5} fill="#8E5CB0" />
    </>
  );
}

export function StrawberryShape() {
  return (
    <>
      <Path d="M14 10c-6 0-9 6-7 12s7 6 7 6 5 0 7-6-1-12-7-12z" fill="#E24C4C" />
      <Path
        d="M9 8l3 3 2-3 2 3 3-3"
        stroke="#4C8C4A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={11} cy={16} r={1} fill="#FDEBD0" />
      <Circle cx={16} cy={15} r={1} fill="#FDEBD0" />
      <Circle cx={13} cy={20} r={1} fill="#FDEBD0" />
      <Circle cx={17} cy={20} r={1} fill="#FDEBD0" />
    </>
  );
}
