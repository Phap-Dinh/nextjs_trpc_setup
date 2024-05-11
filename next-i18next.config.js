const path = require('path')

const config = {
	debug: false,
	localePath:
		typeof window === 'undefined'
			? require('path').resolve('./public/locales')
			: '/locales',

	reloadOnPrerender: process.env.NODE_ENV === 'development',
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
		localeDetection: true,
	},
	localePath: path.resolve('./public/locales'),
}

module.exports = config
