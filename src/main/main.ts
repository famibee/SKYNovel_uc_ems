/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// electron メインプロセス
import {crashReporter, app, BrowserWindow, ipcMain, Menu} from 'electron'
import {join} from 'path'
import {electronApp, optimizer, is} from '@electron-toolkit/utils'

import pkg from '../../package.json';
app.name = pkg.name;	// 非パッケージだと 'Electron' になる件対応
app.setPath('userData', app.getPath('appData') +'/'+ app.name);

crashReporter.start({
	productName	: app.name,
	companyName	: "電子演劇部",
	submitURL	: pkg.homepage,
	compress	: true,
});
if (! app.requestSingleInstanceLock()) app.quit();
app.on('window-all-closed', ()=> app.quit());

let guiWin: BrowserWindow | null = null;
app.on('second-instance', ()=> {
	if (! guiWin) return;

	if (guiWin.isMinimized()) guiWin.restore();
	guiWin.focus();
});
app.whenReady().then(async ()=> {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron');

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, win)=> {
		optimizer.watchWindowShortcuts(win);
	});


	const w = guiWin = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: join(__dirname, '../preload/preload.mjs'),
			sandbox: false,
		}
	});
	guiWin.on('ready-to-show', ()=> w.show());
	ipcMain.on('ping', ()=> console.log('pong'));	// IPC test
	// const _guiWin = (await import('@famibee/skynovel/appMain')).appMain.initRenderer(
	// 	join(__dirname, 'app/index.htm'),
	// 	pkg.version, {},
	// );


	const isMac = process.platform === 'darwin';
	const menu = Menu.buildFromTemplate([{
		label: 'システム',
		submenu: [
			{label: 'このアプリについて', click: ()=> require('about-window').default({
				icon_path	: join(__dirname, 'app/icon.png'),
				package_json_dir	: __dirname,
				copyright	: 'Copyright '+ pkg.appCopyright +' 2024',
				homepage	: pkg.homepage,
				license		: '',
				use_version_info	: false,
			})},
			{type: 'separator'},
			{label: '設定', click: ()=> w.webContents.send('fire', 'c'), accelerator: "CmdOrCtrl+,"},
			{label: '全画面/ウインドウモード切替', click: ()=> w.webContents.send('fire', 'alt+enter'), accelerator: 'F11'},
			{label: 'ウインドウサイズを初期に戻す', click: ()=> w.webContents.send('fire', 'Meta+0')},
			{type: 'separator'},
			{label: 'メッセージを消す', click: ()=> w.webContents.send('fire', ' ')},
			{label: 'メッセージ履歴の表示', click: ()=> w.webContents.send('fire', 'r')},
			{label: '次の選択肢・未読まで進む', click: ()=> w.webContents.send('fire', 'f')},
			{label: '自動的に読み進む', click: ()=> w.webContents.send('fire', 'a')},
			{type: 'separator'},
			{label: 'DevTools', click: ()=> w.webContents.openDevTools(), accelerator: 'F12'},
			isMac ?{role: 'close'} :{role: 'quit'},
		],
	}]);
	Menu.setApplicationMenu(menu);

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		guiWin.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		guiWin.loadFile(join(__dirname, '../renderer/index.html'));
	}
});