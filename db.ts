import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import pkg from './package.json';
import consola from 'consola';

const homedir = os.homedir() || process.env.HOME; // * the string path of the current user's home directory
const dbPath = path.join(homedir, `${pkg.name}-cacheData`, 'data.json');

interface Task {
  title: string;
  done: boolean;
}

const exists = async (file: string = dbPath) => {
  try {
    const exists = await fs.pathExists(file);
    console.log(exists);
    if (!exists) {
      await fs.ensureFile(file);
      await write({ list: [] }, file);
    }
  } catch (e) {
    consola.error(e);
  }
};

const read = async (file: string = dbPath) => {
  try {
    return await fs.readJSON(file);
  } catch (e) {
    consola.error(e);
  }
};

const write = async (object: { list: Task[] }, file: string = dbPath) => {
  try {
    await fs.writeJson(file, object);
  } catch (e) {
    consola.error(e);
  }
};

export default { exists, read, write };
