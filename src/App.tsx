import './global.css';

import Header from './components/Header';
import Task, { TaskType } from './components/Task';
import { ChangeEvent, useEffect, useState } from 'react';
import Plus from '../src/assets/plus.svg';

function App() {
  const localStorageKey = '@ignite-todo-list:tasks-1.0.0';
  const storedStateAsJSON = localStorage.getItem(localStorageKey);
  let storedTasks = [];
  if (storedStateAsJSON) storedTasks = JSON.parse(storedStateAsJSON);
  const [tasks, setTasks] = useState<TaskType[]>(storedTasks);
  const [newTask, setNewTask] = useState('');

  const countNumberOfTasksDone = () => {
    return tasks.reduce((accumulator, task) => {
      if (task.done) return accumulator + 1;
      else return accumulator;
    }, 0);
  };

  const [doneCount, setDoneCount] = useState(countNumberOfTasksDone);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
  };

  const handleKeyDown = (event: { code: string }) => {
    if (event.code === 'Enter') handleCreateNewTaskButton();
  };

  const countTasksDone = () => {
    const count = countNumberOfTasksDone();
    setDoneCount(count);
  };

  const handleDeleteTaskButton = (taskName: string) => {
    const newTasks = tasks.filter((task) => task.name !== taskName);
    setTasks(newTasks);
  };

  const handleCreateNewTaskButton = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { name: newTask, done: false }]);
    setNewTask('');
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(tasks);
    localStorage.setItem(localStorageKey, stateJSON);
  }, [tasks, doneCount]);

  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem(localStorageKey);
    if (storedStateAsJSON) {
      const tasksStored: TaskType[] = JSON.parse(storedStateAsJSON);
      setTasks(tasksStored);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='content'>
        <div className='top-content'>
          <input
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={handleInputChange}
            className='new-task-input'
            onKeyDown={handleKeyDown}
          />
          <button className='button' onClick={() => handleCreateNewTaskButton()}>
            Criar
            <img src={Plus} />
          </button>
        </div>
        <div className='tasks-stats'>
          <div className='stats'>
            <p>Tarefas criadas</p>
            <span className='stats-number'>{tasks.length}</span>
          </div>
          <div className='stats'>
            <p>Concluídas</p>
            <span className='stats-number'>
              {doneCount} de {tasks.length}
            </span>
          </div>
        </div>
        {tasks.map((task) => {
          return (
            <Task
              task={task}
              key={task.name}
              onDelete={handleDeleteTaskButton}
              changeDoneCount={countTasksDone}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
