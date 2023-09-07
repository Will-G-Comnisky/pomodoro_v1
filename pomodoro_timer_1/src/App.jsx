import './App.css';
import Configurations from './components/Configurations';
import Timer from './components/Timer';
import { useState } from 'react';
import ConfigContext from './components/ConfigContext';

function App() {

  const [showConfig, setShowConfig] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <ConfigContext.Provider value={{ 
        showConfig,
        setShowConfig,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
      {showConfig ? <Configurations /> : <Timer />}
      </ConfigContext.Provider>


    </main>

  )
}

export default App
