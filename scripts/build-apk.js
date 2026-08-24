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
// Use the full path rather than relying on cwd + relative-name resolution
// — with Node 24 + shell:true on this machine, cmd.exe's implicit
// cwd-search for gradlew.bat wasn't finding it even with `cwd` set.
const gradlewPath = path.join(androidDir, 'gradlew.bat');
execSync(`"${gradlewPath}" assembleRelease`, {
  cwd: androidDir,
  stdio: 'inherit',
  shell: true,
});

if (!fs.existsSync(apkSource)) {
  console.error(`Expected APK not found at: ${apkSource}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const now = new Date();
const pad = n => String(n).padStart(2, '0');
// Windows filenames can't contain ':', so the time uses dots too
// (25.08.2026 00.45) instead of the more natural 00:45.
const dateStr = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
const timeStr = `${pad(now.getHours())}.${pad(now.getMinutes())}`;
const destPath = path.join(outDir, `tiktak_project ${dateStr} ${timeStr}.apk`);
fs.copyFileSync(apkSource, destPath);

console.log(`\nAPK ready: ${destPath}`);
