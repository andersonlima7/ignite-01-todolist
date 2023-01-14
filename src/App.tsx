import './global.css'

import Header from './components/Header'
import Task from './components/Task'

function App() {
  return (
    <div>
      <Header />
      <div className='content'>
        <Task
          content='Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto, '
          done={false}
        />
        <Task
          content='Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto. Terminar o projeto, '
          done={true}
        />
      </div>
    </div>
  )
}

export default App
