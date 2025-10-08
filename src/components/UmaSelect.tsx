import { useEffect, useRef, useState } from 'react';
import { type umaData, courses, sparks, seasons, weather } from '../types';
import umas from '../../umas.json';

const UmaSelect = (
    { 
        uma, 
        handleUmaChange,
        handleMinimumChange,
        handleSparksChange,
        handleSeasonChange,
        handleCourseChange,
        handleWeatherChange
    }: {
        uma: umaData, 
        handleUmaChange: any,
        handleMinimumChange: any,
        handleSparksChange: any,
        handleSeasonChange: any,
        handleCourseChange: any,
        handleWeatherChange: any
    }) => {

        const [toggled, setToggled] = useState<boolean>(false);
        const toggleRef = useRef<HTMLUListElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            handleFocus();

            const handleOutsideClick = (event: any) => {
                if (toggleRef.current && !toggleRef.current.contains(event.target)) {
                    setToggled(false);
                }
            };

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick)
            };
        }, [toggled]);

        const handleToggle = (): void => setToggled(!toggled)
        const handleFocus = (): void => {
            if (toggled) {
                inputRef.current!.focus();
            } else {
                inputRef.current!.blur();
            }
        }

        return (
            <div>
                <div className='container-uma'>
                    <div 
                        className='uma-icon'
                        onClick={() => {
                            handleToggle();
                            handleFocus();
                        }}
                    >
                        <img src={`/assets/umas/${uma.icon}.png`} />
                    </div>
                    <div className='uma-info'>
                        <div className='uma-name'>
                            <div className='uma-selector'>
                                <input 
                                    ref={inputRef}
                                    type='text' 
                                    className='uma-selected-name' 
                                    value={uma.name[1]}
                                    disabled={!toggled}
                                />
                                {toggled && (
                                <ul ref={toggleRef} className='uma-suggestions'>
                                {Object.entries(umas).map(([key, value]) => 
                                    <li 
                                        className='uma-suggestion' 
                                        key={key}
                                        onClick={() => {
                                            handleUmaChange(value);
                                            handleToggle();
                                            handleFocus();
                                        }}
                                    >
                                        <img src={`/assets/umas/${value.icon}.png`}/>
                                        <div><em>[{value.name[0]}]</em>&nbsp;{value.name[1]}</div>
                                    </li>
                                )}
                                </ul>
                                )}
                            </div>
                            <div><span className='uma-selected-subname'>[{uma.name[0]}]</span></div>
                        </div>
                        <div className='uma-stats'>
                        {Object.values(uma.stats).map((value) => 
                            <div className='stat flex'>
                            {Object.entries(value).map(([key, value]) => 
                                <div>
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </div>
                            )}
                            </div>
                        )}    
                        </div>
                    </div>
                </div>
                <div className='container-options'>
                    <div className='uma-sparks'>
                        <div><span>Sparks</span></div>
                        <div className='sparks'>
                        {sparks.map((spark) => 
                            <div className='spark flex'>
                                <input 
                                    type="checkbox" 
                                    value={spark}
                                    onChange={e => 
                                        handleSparksChange(e.target.checked, e.target.value)
                                    }/>
                                <img src={`/assets/stat_icon/${spark}.png`} />
                            </div>				
                        )}
                        </div>
                    </div>
                    <div className='uma-aptitude flex'>
                        <div><span>Minimum distance aptitude</span></div>
                        <select onChange={e => handleMinimumChange(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className='uma-skills flex'>
                        <div className='skill flex'>
                            <div><span>Season:</span></div>
                            <select 
                                name='' 
                                id=''
                                onChange={e => handleSeasonChange(e.target.value)}
                            >
                            {seasons.map((season) =>
                                <option value={season}>{season}</option>
                            )}
                            </select>
                        </div>
                        <div className='skill flex'>
                            <div><span>Racetrack:</span></div>
                            <select 
                                name='' 
                                id=''
                                onChange={e => handleCourseChange(e.target.value)}
                            >
                            {courses.map((course) =>
                                <option value={course}>{course}</option>
                            )}
                            </select>
                        </div>
                        <div className='skill flex'>
                            <div><span>Weather:</span></div>
                            <select 
                                name='' 
                                id=''
                                onChange={e => handleWeatherChange(e.target.value)}
                            >
                            {weather.map((w) =>
                                <option value={w}>{w}</option>
                            )}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default UmaSelect;
