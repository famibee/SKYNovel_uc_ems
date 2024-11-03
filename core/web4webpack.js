const hPlg = {};
import h from './plugin.js';
for (const nm in h) hPlg[nm] = await import(`./plugin/${nm}/index.js`);

const {SysWeb} = await import('@famibee/skynovel/web');
new SysWeb(hPlg);
