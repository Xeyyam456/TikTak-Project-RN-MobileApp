/**
 * Builds a release APK and copies it out of android/app/build/outputs
 * (deep inside the native build tree) to a top-level /apk folder, so it's
 * easy to find and hand off without digging through Gradle's output dirs.
 *
 * Windows-specific: invokes gradlew.bat directly via a shell, same
 * workaround as the rest of this project's Android build docs (see
 * CLAUDE.md — `npx react-native run-android` doesn't work on this machine).
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const androidDir = path.join(projectRoot, 'android');
const apkSource = path.join(
  androidDir,
  'app',
  'build',
  'outputs',
  'apk',
  'release',
  'app-release.apk',
);
const outDir = path.join(projectRoot, 'apk');

console.log('Building release APK (gradlew.bat assembleRelease)...');
execSync('gradlew.bat assembleRelease', {
  cwd: androidDir,
  stdio: 'inherit',
  shell: true,
});

if (!fs.existsSync(apkSource)) {
  console.error(`Expected APK not found at: ${apkSource}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-')
  .slice(0, 19);
const destPath = path.join(outDir, `tiktak-${timestamp}.apk`);
fs.copyFileSync(apkSource, destPath);

console.log(`\nAPK ready: ${destPath}`);
