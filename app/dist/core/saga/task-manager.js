/* @flow */
import {
  map,
  append as ap,
  slice,
  last,
  remove as rm,
  findIndex,
  propEq,
  pipe,
  __
} from 'ramda';

export const taskManager = {
  taskQueue: [],

  append: (task: any) => {
    task.done.then(() => {
      const index: number = findIndex((propEq('id', task.id): any))(
        taskManager.taskQueue
      );
      if (index > -1) taskManager.remove(index);
    });
    taskManager.taskQueue = ap(task, taskManager.taskQueue);
  },

  clear: () => {
    taskManager.taskQueue = [];
  },

  remove: (index: number) => {
    taskManager.taskQueue = rm(index, 1, taskManager.taskQueue);
  },

  pop: () => {
    taskManager.taskQueue = slice(0, -1, taskManager.taskQueue);
  }
};

export default taskManager;
