#!/usr/bin/env node
import { program } from 'commander';
import consola from 'consola';
import api from './index';
import pkg from './package.json';

program.version(pkg.version);

program
  .command('show')
  .description('show all tasks')
  .action(async () => {
    try {
      await api.showAll();
    } catch (e) {
      consola.error(e);
    }
  });
program
  .command('delete')
  .description('delete all tasks')
  .action(async () => {
    try {
      await api.clear();
      consola.success('All tasks have been deleted successfully');
    } catch (e) {
      consola.error(e);
    }
  });
program
  .command('create <name>')
  .description('create a new task')
  .action(async (title: string) => {
    try {
      await api.add(title);
      consola.success('A new task has been created successfully');
    } catch (e) {
      consola.error(e);
    }
  });

program.parse(process.argv);
