import ReactSlider from 'react-slider';
import '../slider.css'
import ConfigContext from './ConfigContext';
import { useContext } from 'react';
import BackButton from './BackButton';


const Configurations = () => {

    const configInfo = useContext(ConfigContext);

  return (
    <div style={{textAlign: 'left'}}>
        <label> Work Time: {configInfo.workMinutes}:00 </label>

        <ReactSlider 
        className={'work-slider'}
        thumbClassName={'work-thumb'}
        trackClassName={'track'}
        value={configInfo.workMinutes}
        onChange= {newValue => configInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
        />

        <label>Break Time: {configInfo.breakMinutes}:00 </label>

        <ReactSlider 
        className={'break-slider'}
        thumbClassName={'break-thumb'}
        trackClassName={'track'}
        value={configInfo.breakMinutes}
        onChange= {newValue => configInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
        />
        <div style={{textAlign: 'center', marginTop:'20px'}}>
            <BackButton onClick = {() => configInfo.setShowConfig(false)} />
        </div>
        

    </div>
  )
}

export default Configurations