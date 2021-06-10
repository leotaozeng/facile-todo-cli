#!/usr/bin/env node
const api = require('./index')
const pkg = require('./package.json')
const { program } = require('commander')

program
  .command('show')
  .description('show all tasks')
  .action(async () => {
    try {
      await api.showAll()
    } catch (e) {
      consola.error(e)
    }
  })
program
  .command('delete')
  .description('delete all tasks')
  .action(async () => {
    try {
      await api.clear()
      consola.success('All tasks have been deleted successfully')
    } catch (e) {
      consola.error(e)
    }
  })
program
  .command('create <name>')
  .description('create a new task')
  .action(async (title) => {
    try {
      await api.add(title)
      consola.success('A new task has been created successfully')
    } catch (e) {
      consola.error(e)
    }
  })

program.version(pkg.version)
program.parse(process.argv)
