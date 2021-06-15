// * 引入 Database
import db from './db';
import consola from 'consola';
import inquirer from 'inquirer';

interface Task {
  title: string;
  done: boolean;
}

const getAllTasks = async (list: Task[]) => {
  try {
    const { index } = await inquirer.prompt({
      // Question object
      type: 'list',
      name: 'index',
      message: 'What do you want to do?',
      choices: [
        { name: '+ Add', value: -2 },
        { name: '↵ Quit', value: -1 },
        ...list.map((task, index) => {
          return {
            name: `${task.done ? '[✓]' : '[_]'} ${index + 1} - ${task.title}`, // Display in the list
            value: index, // Save in the answers hash
          };
        }),
      ],
    });

    if (index >= 0) {
      chooseTask(list, index);
    } else if (index === -2) {
      createTask();
    }
  } catch (e) {
    consola.error(e);
  }
};

const chooseTask = async (list: Task[], index: number) => {
  try {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        { name: '↵ Quit', value: 'quit' },
        { name: 'x Remove', value: 'removeTask' },
        { name: '- Title', value: 'updateTitle' },
        { name: '✓ Completed', value: 'markAsCompleted' },
        { name: '_ Uncompleted', value: 'markAsUncompleted' },
      ],
    });
    const actions = {
      removeTask,
      updateTitle,
      markAsCompleted,
      markAsUncompleted,
    };
    actions[action] && actions[action](list, index);
  } catch (e) {
    consola.error(e);
  }
};

const createTask = async () => {
  try {
    const { task: newTask } = await inquirer.prompt({
      type: 'input',
      name: 'task',
      message: "What's your new task?",
    });
    add(newTask);
  } catch (e) {
    consola.error(e);
  }
};

const removeTask = async (list: Task[], index: number) => {
  try {
    list.splice(index, 1);
    await db.write({ list });
  } catch (e) {
    consola.error(e);
  }
};

const updateTitle = async (list: Task[], index: number) => {
  try {
    const { title: newTitle } = await inquirer.prompt({
      type: 'input',
      name: 'title',
      message: "What's your new title?",
      default() {
        return list[index].title;
      },
    });
    list[index].title = newTitle;
    await db.write({ list });
  } catch (e) {
    consola.error(e);
  }
};

const markAsCompleted = async (list: Task[], index: number) => {
  try {
    list[index].done = true;
    await db.write({ list });
  } catch (e) {
    consola.error(e);
  }
};

const markAsUncompleted = async (list: Task[], index: number) => {
  try {
    list[index].done = false;
    await db.write({ list });
  } catch (e) {
    consola.error(e);
  }
};

const add = async (title: string) => {
  try {
    await db.exists(); // * 确认文件是否存在

    const { list } = await db.read(); // * 读取之前的任务
    const task = { title, done: false };

    list.push(task); // * 往里面添加一个 task

    await db.write({ list }); // * 存储任务到文件
  } catch (e) {
    consola.error(e);
  }
};

const clear = async () => {
  try {
    await db.write({ list: [] }); // Clear the list array
  } catch (e) {
    consola.error(e);
  }
};

const showAll = async () => {
  try {
    await db.exists(); // * 确认文件是否存在
    const { list } = await db.read();
    getAllTasks(list);
  } catch (e) {
    consola.error(e);
  }
};

export default { add, clear, showAll };
