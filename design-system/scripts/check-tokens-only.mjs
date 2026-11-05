// Fails if any component or layout CSS or JSX hard codes a colour, size, duration, curve or z index.
// Everything must come from a token (var(--...)). Run: npm run check
//
// Allowed on purpose: unitless numbers (line heights, flex), em and % units, calc() over tokens,
// and px inside an @media line, because a breakpoint cannot be a variable.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dirs = process.argv.slice(2).length ? process.argv.slice(2) : ['src/components', 'src/preview', 'src/styles/base.css'];

const walk = (p) => (statSync(p).isDirectory() ? readdirSync(p).flatMap((f) => walk(join(p, f))) : [p]);
const files = dirs.flatMap((d) => walk(join(root, d))).filter((f) => ['.css', '.jsx'].includes(extname(f)));

const rules = [
  ['hex colour', /#[0-9a-fA-F]{3,8}\b/],
  ['rgb/hsl colour', /\b(rgba?|hsla?|oklch|oklab)\(/],
  ['named colour', /:\s*[^;{}]*\b(white|black|red|blue|green|gray|grey|orange|purple|pink|yellow)\b/i],
  ['px size', /(^|[^\w-])-?\d*\.?\d+px\b/],
  ['duration', /(^|[^\w.-])\d*\.?\d+m?s\b/],
  ['easing curve', /cubic-bezier\(/],
  ['z-index number', /z-index:\s*-?\d/],
  ['opacity number', /opacity:\s*0?\.\d/],
];

const problems = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  text.split('\n').forEach((line, i) => {
    const isMedia = /@media/.test(line);
    // Skip selectors and prose in JSX. Only declarations and inline style objects are checked.
    for (const [name, re] of rules) {
      if (name === 'px size' && isMedia) continue;
      if (extname(file) === '.jsx' && !/style=|: *['"`]/.test(line)) continue;
      if (re.test(line)) problems.push(`${relative(root, file)}:${i + 1}  ${name}: ${line.trim()}`);
    }
  });
}

if (problems.length) {
  console.error(`Tokens only check failed (${problems.length}):\n` + problems.join('\n'));
  process.exit(1);
}
console.log(`Tokens only check passed (${files.length} files).`);
