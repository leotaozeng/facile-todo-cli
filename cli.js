#!/usr/bin/env node
const api = require('./index')
const pkg = require('./package.json')
const { program } = require('commander')

const displayAll = async () => {
  try {
    await api.showAll()
  } catch (e) {
    consola.error(e)
  }
}

if (process.argv.length === 2) {
  displayAll()
  return false
}

program
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
  .option('-x, --xxx', 'this is x', 'hello')
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

program
  .command('add <name...>')
  .description('add a new task')
  .action(async (title) => {
    try {
      await api.add(title.join(' '))
      consola.success('A new task has been added successfully')
    } catch (e) {
      consola.error(e)
    }
  })
program
  .command('clear')
  .description('clear all tasks')
  .action(async () => {
    try {
      await api.clear()
      consola.success('All tasks have been cleared successfully')
    } catch (e) {
      consola.error(e)
    }
  })

program.version(pkg.version)
program.parse(process.argv)
