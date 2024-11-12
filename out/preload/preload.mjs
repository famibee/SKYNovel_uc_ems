import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
const api = {};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("etkAPI", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (e) {
    console.error(e);
  }
} else {
  window.etkAPI = electronAPI;
  window.api = api;
}
