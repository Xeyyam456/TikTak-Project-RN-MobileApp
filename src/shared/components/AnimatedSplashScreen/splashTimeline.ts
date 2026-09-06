import {
  AppleShape,
  BananaShape,
  GrapesShape,
  OrangeShape,
  StrawberryShape,
} from './SplashFruitShapes';

// The basket is drawn stroke-by-stroke (classic SVG "line draw": a dash
// covering the whole path, offset from full-length down to 0), then its
// body fills with color, then real fruit shapes fall/tumble into it from
// above, then the wordmark reveals, then everything fades to the app.
//
// The scene's y-coordinates all sit 125px lower than the basket shape's
// original design (a 0-95 box) so there's open canvas above the basket for
// fruits to fall through — only the paths' absolute M/L y-values needed
// the +125 shift, since every other command in them is relative.
export const HANDLE_D = 'M40 155c8-22 32-30 45-30s37 8 45 30';
export const BODY_D =
  'M12 155h146l-14 55a10 10 0 01-9.8 8H35.8a10 10 0 01-9.8-8L12 155z';
export const WEAVE1_D = 'M20 173h130';
export const WEAVE2_D = 'M26 191h118';

export const HANDLE_DASH = 200;
export const BODY_DASH = 450;
export const WEAVE_DASH = 150;

export const HANDLE_DURATION = 500;
export const BODY_DELAY = 350;
export const BODY_DURATION = 750;
export const BODY_DRAW_END = BODY_DELAY + BODY_DURATION; // 1100
export const WEAVE_DURATION = 250;
export const FILL_DURATION = 400;

export const FALL_DURATION = 750;

export type FruitPose = { x: number; y: number; rotate: number };
export type FruitConfig = {
  Shape: typeof AppleShape;
  cx: number;
  cy: number;
  delay: number;
  from: FruitPose;
  to: FruitPose;
};

export const FRUITS: FruitConfig[] = [
  { Shape: AppleShape, cx: 16, cy: 16, delay: 1300, from: { x: 20, y: -10, rotate: -60 }, to: { x: 60, y: 158, rotate: -8 } },
  { Shape: OrangeShape, cx: 16, cy: 17, delay: 1450, from: { x: 140, y: -30, rotate: 70 }, to: { x: 112, y: 163, rotate: 12 } },
  { Shape: BananaShape, cx: 20, cy: 12, delay: 1600, from: { x: 150, y: 55, rotate: -40 }, to: { x: 130, y: 150, rotate: -20 } },
  { Shape: GrapesShape, cx: 15, cy: 15, delay: 1750, from: { x: 10, y: 45, rotate: 50 }, to: { x: 48, y: 145, rotate: 8 } },
  { Shape: StrawberryShape, cx: 14, cy: 14, delay: 1900, from: { x: 85, y: -40, rotate: -25 }, to: { x: 85, y: 172, rotate: 4 } },
];

const LAST_FRUIT_LANDS = FRUITS[FRUITS.length - 1].delay + FALL_DURATION; // 2650

export const WORDMARK_DELAY = LAST_FRUIT_LANDS - 150; // 2500 — slight overlap with the last landing
export const WORDMARK_DURATION = 500;
const HOLD_MS = 800;
export const EXIT_DURATION = 500;
export const EXIT_DELAY = WORDMARK_DELAY + WORDMARK_DURATION + HOLD_MS; // 3800
