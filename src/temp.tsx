import { useEffect, useState } from 'react';
import { type Race, type umaData, courses, defaultUma, seasons, weather as wthr } from './types';

import UmaSelect from './components/UmaSelect';
import Races from './components/Races';

import g1_races from '../g1_races.json';

import './temp.css';

const TempApp = () => {
    const [uma, setUma] = useState<umaData>(defaultUma);
    const [minimum, setMinimum] = useState<string>('A');
    const [sparks, setSparks] = useState<string[]>([]);
    const [season, setSeason] = useState<string|null>(null);
    const [course, setCourse] = useState<string|null>(null);
    const [weather, setWeather] = useState<string|null>(null);
    const [races, setRaces] = useState<Race[]>([]);

    let handleUmaChange = (value: umaData): void => {
        setUma(value);
    }

    let handleMinimumChange = (value: string): void => {
        setMinimum(value);
    }

    let handleSparksChange = (checked: boolean, value: string): void => {
        if (checked) {
            setSparks(
                [
                    ...sparks,
                    value
                ]
            );
        } else {
            setSparks(sparks.filter(spark => spark != value));
        }
    }

    let handleSeasonChange = (value: string): void => {
        setSeason(value);
    }

    let handleCourseChange = (value: string): void => {
        setCourse(value);
    }

    let handleWeatherChange = (value: string): void => {
        setWeather(value);
    }

    let careerPlanner = (): void => {
        const g1s: Race[] = Object.values(JSON.parse(JSON.stringify(g1_races)));
        let career: Race[] = g1s;
        const uma_races: (string|number)[][] = uma.career;

        for (let i=career.length-1; i>=0; i--) {
            let race: Race = career[i];
            let turn: number = (12*((race.year[0]-1)*2)+1) + ((race.year[1]*2)-2) + (race.year[2]-1);

            if (!(uma_races.some(e => e[0] == race.name && e[2] == turn)) ) {
                if (
                    ((uma.stats.surface[race.type[0].toLowerCase() as keyof object] as string) != 'A' ||
                    (uma.stats.distance[race.type[1].toLowerCase() as keyof object] as string) > minimum)
                ) {
                    career.splice(i, 1);
                } else {
                    if (sparks.length > 0) {
                        if (!race.sparks.some(e => sparks.includes(e))) {
                            if (
                                ((season && race.sparks.some(e => seasons.includes(e)) && !race.sparks.includes(season)) &&
                                (course && race.sparks.some(e => courses.includes(e)) && !race.sparks.includes(course)) &&
                                (weather && race.sparks.some(e => wthr.includes(e)) && !race.sparks.includes(weather)))
                            ) {
                                career.splice(i, 1);
                            }
                        }
                    } else {
                        if (
                            ((season && race.sparks.some(e => seasons.includes(e)) && !race.sparks.includes(season)) &&
                            (course && race.sparks.some(e => courses.includes(e)) && !race.sparks.includes(course)) &&
                            (weather && race.sparks.some(e => wthr.includes(e)) && !race.sparks.includes(weather)))
                        ) {
                            career.splice(i, 1);
                        }
                    }
                }
            }
        }

        setRaces(career);
    }

    
    useEffect(() => {
        careerPlanner();
    }, [uma])
    

    return (
        <div className='container'>
            <div className='container-a'>
                <UmaSelect 
                    uma={uma}
                    handleUmaChange={handleUmaChange} 
                    handleMinimumChange={handleMinimumChange} 
                    handleSparksChange={handleSparksChange}
                    handleSeasonChange={handleSeasonChange}
                    handleCourseChange={handleCourseChange}
                    handleWeatherChange={handleWeatherChange}
                />
            </div>
            <div className='container-b'>
                <Races races={races} uma={uma} />
            </div>
        </div>
    )
}

export default TempApp;
