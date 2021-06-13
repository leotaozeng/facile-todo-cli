import os from 'os';
import fs from 'fs-extra';
import pkg from './package.json';
import path from 'path';
import consola from 'consola';

const homedir = process.env.HOME || process.env.PWD || os.homedir();
const dbPath = path.join(homedir, `${pkg.name}-cacheData`, 'data.json');

const db = {
  async exists(file: string = dbPath) {
    try {
      const exists = await fs.pathExists(file);
      if (!exists) {
        await fs.ensureFile(file);
        await this.write({ list: [] });
      }
    } catch (e) {
      consola.error(e);
    }
  },
  async read(file: string = dbPath) {
    try {
      return await fs.readJSON(file);
    } catch (e) {
      consola.error(e);
    }
  },
  async write(object: { list: any }, file: string = dbPath) {
    try {
      await fs.writeJson(file, object);
    } catch (e) {
      consola.error(e);
    }
  },
};

export default db;
