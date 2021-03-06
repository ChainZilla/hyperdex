'use strict';
const path = require('path');
const {app} = require('electron');
const ipc = require('electron-better-ipc');
const i18next = require('i18next');
const i18nextBackend = require('i18next-sync-fs-backend');
const {isDevelopment} = require('./util-common');

i18next
	.use(i18nextBackend)
	.init({
		debug: isDevelopment,
		fallbackLng: 'en-US',
		whitelist: [
			'ar',
			'en',
			'de',
			'es-ES',
			'fr',
			'ja',
			'ko',
			'ru',
			'tr',
			'zh-CN',
			'nb',
		],
		nonExplicitWhitelist: true,
		ns: [
			'app',
			'chart',
			'common',
			'dashboard',
			'exchange',
			'forgot-password',
			'login',
			'menu',
			'nav',
			'portfolio',
			'settings',
			'swap',
			'trades',
		],
		initImmediate: false,
		backend: {
			loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json'),
			jsonIndent: 4,
		},
	});

app.on('ready', () => {
	i18next.changeLanguage(app.getLocale());
});

ipc.answerRenderer('get-translations', () => i18next);

exports.i18n = i18next;
exports.translate = namespaces => namespaces ? i18next.getFixedT(null, namespaces) : i18next.t.bind(i18next);
