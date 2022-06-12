import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker'
import { resolve } from 'path'
import { UserConfig, Plugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const shouldAnalyze = process.env.ANALYZE

const config: UserConfig = {
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  esbuild: {
    jsxFactory: '_jsx',
    jsxFragment: '_jsxFragment',
    jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`
  },
  build: {
    rollupOptions: {
      plugins: shouldAnalyze ? [visualizer({ open: true, filename: './bundle-size/bundle.html' }) as Plugin] : []
    },
    sourcemap: !!shouldAnalyze
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@emotion',
            {
              importMap: {
                '@mui/material': {
                  styled: {
                    canonicalImport: ['@emotion/styled', 'default'],
                    styledBaseImport: ['@mui/material', 'styled']
                  }
                },
                '@mui/material/styles': {
                  styled: {
                    canonicalImport: ['@emotion/styled', 'default'],
                    styledBaseImport: ['@mui/material/styles', 'styled']
                  }
                }
              }
            }
          ]
        ]
      }
    }),
    Checker({
      typescript: true,
      overlay: true,
      eslint: {
        files: 'src',
        extensions: ['.ts', '.tsx']
      }
    })
  ]
}

const getConfig = () => config

export default getConfig
