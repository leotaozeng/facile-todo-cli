const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const consola = require('consola')
const { name: appName } = require('./package.json')

const homedir = process.env.HOME || process.env.PWD || os.homedir()
const dbPath = path.join(homedir, `${appName}-cacheData`, 'data.json')

const db = {
  async exists(file = dbPath) {
    try {
      const exists = await fs.pathExists(file)
      if (!exists) {
        await fs.ensureFile(file)
        await this.write({ list: [] })
      }
    } catch (e) {
      consola.error(e)
    }
  },
  async read(file = dbPath) {
    try {
      return await fs.readJSON(file)
    } catch (e) {
      consola.error(e)
    }
  },
  async write(object, file = dbPath) {
    try {
      await fs.writeJson(file, object)
    } catch (e) {
      consola.error(e)
    }
  }
}

module.exports = db
