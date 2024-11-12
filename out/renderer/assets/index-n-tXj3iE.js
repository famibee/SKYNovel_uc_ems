const etkAPI = window.etkAPI;
function replaceText(sel, txt) {
  const el = document.querySelector(sel);
  if (el) el.innerText = txt;
}
window.addEventListener("DOMContentLoaded", () => {
  console.log(`fn:renderer.ts line:18 etkAPI:%o`, etkAPI);
  const ver = etkAPI.process.versions;
  replaceText(".electron-version", `Electron v${ver.electron}`);
  replaceText(".chrome-version", `Chromium v${ver.chrome}`);
  replaceText(".node-version", `Node v${ver.node}`);
  const hdlIpcBtn = document.getElementById("ipcHandler");
  if (hdlIpcBtn) hdlIpcBtn.addEventListener("click", () => {
    etkAPI.ipcRenderer.send("ping");
  });
});
