const path = require('path')
const express = require('express')
const BS = require('browser-sync')
const bs = BS.create()
const SRC_DIR = path.resolve(path.join(__dirname, '../src'))
const DEV_DIR = path.resolve(__dirname)
const INDEX_DIR = path.resolve(__dirname + '/..')
const NODE_MODULES = path.resolve(path.join(__dirname, '../node_modules'))

async function init () {
  process.env.DATABASE_URL = 'db.sqlite'
  process.env.DATA_FOLDER = path.resolve(path.join(__dirname, '..', '.testweb'))
  const Init = require('bbb-cms-api').default
  const apiServer = await Init()

  bs.init({
    server: [ DEV_DIR, INDEX_DIR, NODE_MODULES ],
    port: 8080,
    open: false,
    ui: false,
    middleware: [
      { route: '/api', handle: apiServer },
      { route: '/data', handle: express.static(process.env.DATA_FOLDER) }
    ]
  })
  bs.watch(DEV_DIR + '/index.html').on('change', bs.reload)
  bs.watch(SRC_DIR + '/**/*.js').on('change', function (filepath, file) {
    bs.reload(filepath)
  })
}
init()