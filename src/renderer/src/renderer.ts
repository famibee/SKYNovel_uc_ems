import type {ElectronAPI} from '@electron-toolkit/preload'
const etkAPI = (window as any).etkAPI as ElectronAPI;


function replaceText(sel: string, txt: string): void {
	const el = document.querySelector<HTMLElement>(sel);
	if (el) el.innerText = txt;
}

window.addEventListener('DOMContentLoaded', ()=> {
console.log(`fn:renderer.ts line:11 etkAPI:%o`, etkAPI);

	const ver = etkAPI.process.versions
	replaceText('.electron-version', `Electron v${ver.electron}`);
	replaceText('.chrome-version', `Chromium v${ver.chrome}`);
	replaceText('.node-version', `Node v${ver.node}`);

	const hdlIpcBtn = document.getElementById('ipcHandler');
	if (hdlIpcBtn) hdlIpcBtn.addEventListener('click', ()=> {
		etkAPI.ipcRenderer.send('ping');
	});
});
