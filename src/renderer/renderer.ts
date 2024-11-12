/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {ElectronAPI} from '@electron-toolkit/preload'
const etkAPI = (window as any).etkAPI as ElectronAPI;


function replaceText(sel: string, txt: string): void {
	const el = document.querySelector<HTMLElement>(sel);
	if (el) el.innerText = txt;
}

window.addEventListener('DOMContentLoaded', ()=> {
console.log(`fn:renderer.ts line:18 etkAPI:%o`, etkAPI);

	const ver = etkAPI.process.versions
	replaceText('.electron-version', `Electron v${ver.electron}`);
	replaceText('.chrome-version', `Chromium v${ver.chrome}`);
	replaceText('.node-version', `Node v${ver.node}`);

	const hdlIpcBtn = document.getElementById('ipcHandler');
	if (hdlIpcBtn) hdlIpcBtn.addEventListener('click', ()=> {
		etkAPI.ipcRenderer.send('ping');
	});
});
