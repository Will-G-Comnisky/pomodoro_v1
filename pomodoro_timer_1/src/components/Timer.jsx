import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import ConfigContext from './ConfigContext';

const red = '#f54e4e';
const green = '#4aec8c';

const Timer = () => {

    const configInfo = useContext(ConfigContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); //work, break or null
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const tick = () => {
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    }

    useEffect (() => {

    const switchMode = () => {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? configInfo.workMinutes  : configInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
        }
    
      secondsLeftRef.current = configInfo.workMinutes * 60;
      setSecondsLeft(secondsLeftRef.current);

      
      const interval = setInterval (() => {
        if (isPausedRef.current) {
          return;
        }
        if (secondsLeftRef.current === 0) {
         return switchMode();
        }

        tick();

      }, 1000);

      return () => clearInterval(interval);

    }, [configInfo])

    const totalSeconds = mode === 'work' 
    ? configInfo.workMinutes * 60 
    : configInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100) ;

    const minutes = Math.floor(secondsLeft / 60);

    let seconds = secondsLeft % 60;
    if (seconds < 10 ) seconds = '0'+seconds;

  return (
    <div>
        <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
        textColor:'#fff',
        pathColor:mode === 'work' ? red : green,
        tailColor:'rgba(255,255,255,.2)',
      })} />
      
        <div className='btns'>
          {isPaused 

          ? <PlayButton onClick= {() =>{ setIsPaused(false); isPausedRef.current = false; }}  /> 

          : <PauseButton onClick= {() =>{ setIsPaused(true); isPausedRef.current = true; }}  />}
        </div>
        <div className='btns'>
            <SettingsButton onClick = {() => configInfo.setShowConfig(true)} />
        </div>
    </div>
  );
};

export default Timer;