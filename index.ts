// * 引入 Database
import db from './db';
import consola from 'consola';
import inquirer from 'inquirer';

const getAllTasks = async (list: any[]) => {
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
    handleError(e);
  }
};

const chooseTask = async (list: any[], index: any) => {
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
    handleError(e);
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
    handleError(e);
  }
};

const removeTask = async (list: any[], index: any) => {
  try {
    list.splice(index, 1);
    await db.write({ list });
  } catch (e) {
    handleError(e);
  }
};

const updateTitle = async (
  list: { [x: string]: { title: any } },
  index: string | number
) => {
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
    handleError(e);
  }
};

const markAsCompleted = async (
  list: { [x: string]: { done: boolean } },
  index: string | number
) => {
  try {
    list[index].done = true;
    await db.write({ list });
  } catch (e) {
    handleError(e);
  }
};

const markAsUncompleted = async (
  list: { [x: string]: { done: boolean } },
  index: string | number
) => {
  try {
    list[index].done = false;
    await db.write({ list });
  } catch (e) {
    handleError(e);
  }
};

const handleError = (e: any) => {
  consola.error(e);
};

const add = async (title: string) => {
  try {
    await db.exists(); // 确认文件是否存在

    const { list } = await db.read(); // 读取之前的任务
    const task = { title, done: false };

    list.push(task); // 往里面添加一个 title 任务

    await db.write({ list }); // 存储任务到文件
  } catch (e) {
    handleError(e);
  }
};

const clear = async () => {
  try {
    await db.write({ list: [] }); // Clear the list array
  } catch (e) {
    handleError(e);
  }
};

const showAll = async () => {
  try {
    await db.exists(); // 确认文件是否存在

    const { list } = await db.read();
    getAllTasks(list);
  } catch (e) {
    handleError(e);
  }
};

export default { add, clear, showAll };
