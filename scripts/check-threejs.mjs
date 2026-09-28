import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const course = 'src/cours/threejs/';
if (!existsSync(new URL(course, root))) {
  console.log('Three.js : sources privées absentes de ce dépôt, vérification locale ignorée.');
  process.exit(0);
}
const { makePositions, MAX_POINTS } = await import('../public/ressources/threejs/atelier/particles.js');
const chapters = readdirSync(new URL(course, root)).filter(name => name.endsWith('.md'));
assert.equal(chapters.length, 11);
const { lessons } = JSON.parse(read('public/ressources/threejs/course-index.json'));
assert.equal(lessons.length, 89);
assert.equal(new Set(lessons.map(l => l.url)).size, 89);
const catalogue = read(`${course}10-catalogue.md`);
for (const lesson of lessons) assert.ok(catalogue.includes(`](${lesson.url})`), lesson.title);
assert.equal((catalogue.match(/\| Parcours court \|/g) ?? []).length, 6);
const lab = 'public/ressources/threejs/atelier/';
const html = read('src/pages/ressources/threejs/atelier/index.astro');
const imports = JSON.parse(html.match(/<script[^>]*type="importmap"[^>]*>(.*?)<\/script>/s)[1]).imports;
for (const path of Object.values(imports)) assert.ok(existsSync(new URL(`public${path}`, root)), path);
for (const name of ['three.core.js', 'THREE-LICENSE.txt', 'InclusiveSans.woff2', 'InclusiveSans-OFL.txt']) {
  assert.ok(existsSync(new URL(`${lab}vendor/${name}`, root)), name);
}
assert.ok(html.includes('lang="fr"'));
assert.ok(!html.includes('node_modules'));
for (const count of [2, 500, MAX_POINTS]) {
  const { spiral, sphere } = makePositions(count);
  assert.equal(spiral.length, count * 3);
  assert.equal(sphere.length, count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    assert.ok(Math.abs(Math.hypot(...sphere.subarray(i, i + 3)) - 2) < 0.000001);
    assert.ok(Math.hypot(spiral[i], spiral[i + 2]) <= 2.700001);
  }
}
for (const count of [0, 1, -1, 3.5, NaN, Infinity, MAX_POINTS + 1]) assert.throws(() => makePositions(count), RangeError);
const sphere = makePositions(MAX_POINTS).sphere;
const occupied = new Set();
for (let i = 0; i < 6000 * 3; i += 3) {
  const latitude = Math.min(7, Math.floor((sphere[i + 1] + 2) * 2));
  const longitude = Math.floor((Math.atan2(sphere[i + 2], sphere[i]) + Math.PI) / (2 * Math.PI) * 12) % 12;
  occupied.add(`${latitude}:${longitude}`);
}
assert.equal(occupied.size, 96);
console.log('Three.js : sources, 89 liens, ressources locales et répartition des particules vérifiés.');

for (const origin of process.argv.slice(2)) {
  const home = await fetch(new URL('/', origin));
  assert.ok((await home.text()).includes('href="/threejs/"'));
  const search = await (await fetch(new URL('/search.json', origin))).json();
  const paths = new Set();
  for (const name of chapters) {
    const path = name === 'index.md' ? '/threejs/' : `/threejs/${name.replace(/\.md$/, '')}/`;
    paths.add(path);
    assert.ok(search.some(entry => entry.url.startsWith(path)), `Recherche : ${path}`);
    for (const [, href] of read(`${course}${name}`).matchAll(/\]\((\/[^)]+)\)/g)) paths.add(href);
  }
  for (const path of paths) {
    assert.equal((await fetch(new URL(path, origin))).status, 200, `Lien absent : ${path}`);
  }
  const path = '/ressources/threejs/atelier/';
  const page = await fetch(new URL(path + '?mode=waves', origin));
  assert.equal(page.status, 200, `Atelier inaccessible : ${origin}`);
  assert.match(await page.text(), /<canvas[^>]+id="scene"/);
  for (const asset of ['style.css', 'main.js', 'particles.js', 'vendor/three.core.js', ...Object.values(imports)]) {
    const response = await fetch(new URL(asset.startsWith('/') ? asset : path + asset, origin));
    assert.equal(response.status, 200, `Ressource absente : ${asset}`);
    assert.match(response.headers.get('content-type'), asset.endsWith('.css') ? /text\/css/ : /javascript/);
  }
  console.log(`Atelier et ressources accessibles : ${origin}`);
}
