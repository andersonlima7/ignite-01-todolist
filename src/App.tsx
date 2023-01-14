import './global.css';

import Header from './components/Header';
import Task, { TaskProps } from './components/Task';
import { ChangeEvent, useState } from 'react';
import Plus from '../src/assets/plus.svg';

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
  };

  const handleDeleteTaskButton = (taskName: string) => {
    const newTasks = tasks.filter((task) => task.name !== taskName);
    setTasks(newTasks);
  };

  const handleCreateNewTaskButton = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { name: newTask, onDelete: handleDeleteTaskButton }]);
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
          />
          <button className='button' onClick={() => handleCreateNewTaskButton()}>
            Criar
            <img src={Plus} />
          </button>
        </div>
        <div className='tasks-stats'>
          <p>
            Tarefas criadas <span></span>
          </p>
          <p>
            Concluídas <span></span>
          </p>
        </div>
        {tasks.map((task) => {
          return <Task name={task.name} key={task.name} onDelete={handleDeleteTaskButton} />;
        })}
      </div>
    </div>
  );
}

export default App;
