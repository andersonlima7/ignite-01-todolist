import './global.css';

import Header from './components/Header';
import Task, { TaskProps } from './components/Task';
import { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import Plus from '../src/assets/plus.svg';

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState('');
  const [doneCount, setDoneCount] = useState(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
  };

  const handleKeyDown = (event: { code: string }) => {
    if (event.code === 'Enter') handleCreateNewTaskButton();
  };

  const handleTaskDone = (increase: boolean) => {
    const currentCount = doneCount;
    if (increase) setDoneCount(currentCount + 1);
    else setDoneCount(currentCount - 1);
  };

  const handleDeleteTaskButton = (taskName: string) => {
    const newTasks = tasks.filter((task) => task.name !== taskName);
    setTasks(newTasks);
  };

  const handleCreateNewTaskButton = () => {
    if (newTask.trim() === '') return;
    setTasks([
      ...tasks,
      { name: newTask, onDelete: handleDeleteTaskButton, increaseDoneCount: handleTaskDone },
    ]);
    setNewTask('');
  };

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
              name={task.name}
              key={task.name}
              onDelete={handleDeleteTaskButton}
              increaseDoneCount={handleTaskDone}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
