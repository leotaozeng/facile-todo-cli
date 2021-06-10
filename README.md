# Node.js: facile-todo-cli

a simple CLI tool for managing a To-Do List including <code>show</code>, <code>create</code>, <code>update</code> and <code>delete</code> functionality.

## Installation

```bash
# npm
npm install -g facile-todo-cli

# yarn
yarn global add facile-todo-cli
```

## Usage

### 1. Help

```bash
$ facile-todo
Usage: facile-todo [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  show            show all tasks
  delete          delete all tasks
  create <name>   create a new task
  help [command]  display help for command
```

### 2. Show all todo tasks

```bash
$ facile-todo show

? What do you want to do? (Use arrow keys)
❯ + Add
  ↵ Quit
  [_] 1 - Buy some fruit
  [✓] 2 - Buy some water
```

### 3. Delete all todo tasks

```bash
$ facile-todo delete
All tasks have been deleted successfully
```

### 4. Create a new todo task

```bash
$ facile-todo create "Have lunch"
A new task has been created successfully
```
