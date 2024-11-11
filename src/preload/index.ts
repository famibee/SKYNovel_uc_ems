import {contextBridge} from 'electron'
import {electronAPI} from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('etkAPI', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (e) {
		console.error(e);
	}
}
else {
	// @ts-ignore (define in dts)
	window.etkAPI = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
