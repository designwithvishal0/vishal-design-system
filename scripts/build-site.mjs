// Builds everything into one static site for Vercel:
//   site/                  the hand in page (site-src)
//   site/design-system/    the component preview
//   site/messaging/        three messaging layouts
//   site/reading-profile/  three reading profile layouts
//   site/cold-test/claim-flow/  the cold test: built by a fresh agent from the skill alone, not one of the six
import { execSync } from 'node:child_process';
import { rmSync, mkdirSync } from 'node:fs';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
rmSync('site', { recursive: true, force: true });
mkdirSync('site');
run('npm run tokens -w design-system');
run(`npx vite build site-src --outDir ${process.cwd()}/site --emptyOutDir`);
for (const [ws, out] of [['design-system', 'design-system'], ['messaging', 'messaging'], ['reading-profile', 'reading-profile']]) {
  run(`npm run build -w ${ws} -- --outDir ${process.cwd()}/site/${out} --emptyOutDir`);
}
run(`npx vite build products/cold-test/claim-flow --outDir ${process.cwd()}/site/cold-test/claim-flow --emptyOutDir`);
