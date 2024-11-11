import { app, crashReporter, BrowserWindow, ipcMain, Menu } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const icon = join(__dirname, "./chunks/icon-BG97WgHO.png");
const name = "uc";
const version = "1.0.0";
const productName = "桜の樹の下には";
const description = "梶井基次郎「桜の樹の下には」をノベルゲーム化したものです。";
const _main = "doc/app.js";
const main = "./out/main/index.js";
const appId = "com.fc2.blog.famibee.skynovel.uc";
const appBundleId = "com.fc2.blog.famibee.skynovel.uc";
const appCopyright = "(c)ふぁみべぇ";
const author = "ふぁみべぇ";
const license = "MIT";
const type = "module";
const dependencies = {
  "@electron-toolkit/preload": "^3.0.1",
  "@electron-toolkit/utils": "^3.0.0",
  "@famibee/skynovel": "file:../skynovel_pixi8",
  "about-window": "^1.15.2",
  "humane-js": "^3.2.2"
};
const devDependencies = {
  "@electron-toolkit/eslint-config-prettier": "^2.0.0",
  "@electron-toolkit/eslint-config-ts": "^2.0.0",
  "@electron-toolkit/tsconfig": "^1.0.1",
  "@types/humane-js": "^3.2.4",
  electron: "^33.2.0",
  "electron-builder": "^25.1.8",
  "electron-vite": "^2.3.0",
  vite: "^5.4.10"
};
const scripts = {
  start: "electron-vite preview",
  dev: "vite",
  build: "tsc && vite build",
  preview: "vite preview",
  npm_check_updates: "ncu -u --target minor && npm update && ncu -g"
};
const build = {
  appId: "com.fc2.blog.famibee.skynovel.uc",
  productName: "桜の樹の下には",
  artifactName: "uc-${version}-${arch}.${ext}",
  directories: {
    output: "build/package/"
  },
  files: [
    "build/icon/*",
    "build/include/*",
    "doc/app/*",
    "doc/prj/",
    "doc/app.js"
  ],
  mac: {
    icon: "build/icon/icon.icns",
    target: [
      "dmg"
    ],
    category: "public.app-category.games"
  },
  dmg: {
    contents: [
      {
        x: 410,
        y: 220,
        type: "link",
        path: "/Applications"
      },
      {
        x: 130,
        y: 220,
        type: "file"
      },
      {
        x: 130,
        y: 100,
        type: "file",
        path: "build/include/readme.txt"
      }
    ]
  },
  win: {
    icon: "build/icon/icon.ico",
    target: "nsis",
    asarUnpack: [
      "build/include/"
    ]
  },
  linux: {
    icon: "build/icon/icon.icns",
    target: "AppImage",
    category: "Game"
  }
};
const keywords = [
  "sample",
  "skynovel"
];
const repository = {
  type: "git",
  url: "git+ssh://git@github.com:famibee/SKYNovel_uc_ems.git"
};
const bugs = {
  url: "https://github.com/famibee/SKYNovel_uc/issues",
  email: "ugainovel@gmail.com"
};
const homepage = "https://famibee.blog.fc2.com/";
const pkg = {
  name,
  version,
  productName,
  description,
  _main,
  main,
  appId,
  appBundleId,
  appCopyright,
  author,
  license,
  type,
  dependencies,
  devDependencies,
  scripts,
  build,
  keywords,
  repository,
  bugs,
  homepage
};
app.name = pkg.name;
app.setPath("userData", app.getPath("appData") + "/" + app.name);
crashReporter.start({
  productName: app.name,
  companyName: "電子演劇部",
  submitURL: pkg.homepage,
  compress: true
});
if (!app.requestSingleInstanceLock()) app.quit();
app.on("window-all-closed", () => app.quit());
let guiWin = null;
app.on("second-instance", () => {
  if (!guiWin) return;
  if (guiWin.isMinimized()) guiWin.restore();
  guiWin.focus();
});
app.whenReady().then(async () => {
  electronApp.setAppUserModelId("com.electron");
  app.on("browser-window-created", (_, win) => {
    optimizer.watchWindowShortcuts(win);
  });
  const w = guiWin = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false
    }
  });
  guiWin.on("ready-to-show", () => w.show());
  ipcMain.on("ping", () => console.log("pong"));
  const isMac = process.platform === "darwin";
  const menu = Menu.buildFromTemplate([{
    label: "システム",
    submenu: [
      { label: "このアプリについて", click: () => require2("about-window").default({
        icon_path: join(__dirname, "app/icon.png"),
        package_json_dir: __dirname,
        copyright: "Copyright " + pkg.appCopyright + " 2024",
        homepage: pkg.homepage,
        license: "",
        use_version_info: false
      }) },
      { type: "separator" },
      { label: "設定", click: () => w.webContents.send("fire", "c"), accelerator: "CmdOrCtrl+," },
      { label: "全画面/ウインドウモード切替", click: () => w.webContents.send("fire", "alt+enter"), accelerator: "F11" },
      { label: "ウインドウサイズを初期に戻す", click: () => w.webContents.send("fire", "Meta+0") },
      { type: "separator" },
      { label: "メッセージを消す", click: () => w.webContents.send("fire", " ") },
      { label: "メッセージ履歴の表示", click: () => w.webContents.send("fire", "r") },
      { label: "次の選択肢・未読まで進む", click: () => w.webContents.send("fire", "f") },
      { label: "自動的に読み進む", click: () => w.webContents.send("fire", "a") },
      { type: "separator" },
      { label: "DevTools", click: () => w.webContents.openDevTools(), accelerator: "F12" },
      isMac ? { role: "close" } : { role: "quit" }
    ]
  }]);
  Menu.setApplicationMenu(menu);
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    guiWin.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    guiWin.loadFile(join(__dirname, "../renderer/index.html"));
  }
});
