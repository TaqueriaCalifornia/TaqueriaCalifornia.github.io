import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("build contains the branded GitHub Pages metadata", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

  assert.match(html, /Taqueria California/);
  assert.match(html, /https:\/\/taqueriacalifornia\.github\.io\//);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /918-873-0623/);
  assert.match(html, /11 N Lewis Ave/);
});

test("build contains the interactive site and optimized media", async () => {
  const assetNames = await readdir(new URL("../dist/assets/", import.meta.url));
  const scriptName = assetNames.find((name) => /^index-.*\.js$/.test(name));

  assert.ok(scriptName, "Expected the compiled site JavaScript.");
  const script = await readFile(new URL(`../dist/assets/${scriptName}`, import.meta.url), "utf8");
  assert.match(script, /Taqueria California/);
  assert.match(script, /Fresh Mexican food made daily/);
  assert.match(script, /taqueriacaliforniatulsa@gmail\.com/);
  assert.match(script, /mobile-actions/);

  await Promise.all([
    access(new URL("../dist/media/truck-640.avif", import.meta.url)),
    access(new URL("../dist/media/truck-1200.jpg", import.meta.url)),
    access(new URL("../dist/media/logo-256.png", import.meta.url)),
    access(new URL("../dist/og.jpg", import.meta.url)),
    access(new URL("../dist/.nojekyll", import.meta.url)),
    access(new URL("../dist/robots.txt", import.meta.url)),
    access(new URL("../dist/sitemap.xml", import.meta.url)),
  ]);
});
