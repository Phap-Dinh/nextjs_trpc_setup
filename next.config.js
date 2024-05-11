const { env } = require('./src/config/evn/env')

function getConfig(config) {
	return config
}

module.exports = getConfig({
	publicRuntimeConfig: {
		NODE_ENV: env.NODE_ENV,
	},
	/** We run eslint as a separate task in CI */
	eslint: { ignoreDuringBuilds: !!process.env.CI },
})

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
    domains: [
      {
        domain: 'mynext.ai',
        defaultLocale: 'en-US',
      },
      {
        domain: 'mynext.ai/fr',
        defaultLocale: 'fr',
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },
  trailingSlash: true,
  experimental: {
    externalDir: false,
    esmExternals: true,
  },
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    }

    return config
  },
  // Get images from another webiste
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
