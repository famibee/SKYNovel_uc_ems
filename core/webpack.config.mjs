// 変更後は「npm run webpack:dev」
import WebpackObfuscator from 'webpack-obfuscator';
//const WebpackObfuscator = require('webpack-obfuscator');
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const isPrd = process.env.NODE_ENV === 'production';
let cfg = {
	target: 'web',
	resolve: { fallback: {'url': resolve('url/'),} },
	experiments: { outputModule: true, },
};
if (isPrd) cfg = {...cfg, module: {rules: [
	{
		enforce: 'post',
		test: /\.js$/,
		use: [{
			loader: WebpackObfuscator.loader,
			options: {
				compact: true,
				controlFlowFlattening: false,
				deadCodeInjection: false,
				debugProtection: false,
				debugProtectionInterval: false,
				disableConsoleOutput: false,
				identifierNamesGenerator: 'hexadecimal',
				log: false,
				renameGlobals: false,
				rotateStringArray: true,
				selfDefending: false,
				stringArray: true,
	//			stringArrayEncoding: false,
				stringArrayThreshold: 0.75,
				unicodeEscapeSequence: false,
			}
		}],
		exclude: /node_modules/
	},
]},};
else cfg = {...cfg, cache: {
	type: 'filesystem',
	buildDependencies: { config: [__filename], },
},};

export default [{
	...cfg,
	entry: `./core/app4webpack`,
	output: {
		path: process.cwd() +'/doc/app',
		module: true,
		filename: 'index.js',
	},
},{
	...cfg,
	entry: `./core/web4webpack`,
	output: {
		path: process.cwd() +'/doc',
		module: true,
		filename: 'web.js',
		chunkFilename: 'web.[name].js',
	},
}];
