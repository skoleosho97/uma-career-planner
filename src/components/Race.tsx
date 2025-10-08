import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

import { type Race, type umaData, courses, months, seasons } from '../types';

const displaySparkImg = (spark: string) => {
	if (courses.some(e => e == spark)) {
		return (
  			<img src='./assets/stat_icon/skill_sta.png'/>
		)
	}

	if (seasons.some(e => e == spark)) {
		return (
  			<img src='./assets/stat_icon/skill_spd.png'/>
		)
	}

	return (
  		<img src={`./assets/stat_icon/${spark}.png`}/>
	)
}

const displayRaceRibbon = (race: Race, uma: umaData) => {
	let turn = (12*((race.year[0]-1)*2)+1) + ((race.year[1]*2)-2) + (race.year[2]-1);

	if (uma.career.some(e => e[0] == race.name && e[2] == turn)) {
		return (
			<div className='race-ribbon'>Career Race</div>
		)
	}

	return null;
}

const RaceComponent = ({race, uma}: { race: Race, uma: umaData }) => {
    return (
        <div className='container-race'>
            <div className='race-logo'>
                <img src={`./assets/races/${race.logo}.png`} />
            </div>
            <div className='race-name'>				
                <div className='race-sparks flex'>
                    <div>{displaySparkImg(race.sparks[0])}</div>
                    <div>{displaySparkImg(race.sparks[1])}</div>
                </div>
                <span>{race.name}</span>
            </div>
            {displayRaceRibbon(race, uma)}
            <div className='race-year'>
                <span>
                    <FontAwesomeIcon icon={faCalendar as IconProp} />
                    <span>{race.year[2] == 1 ? 'Early' : 'Late'}&nbsp;{months[race.year[1]-1]}</span>
                </span>
            </div>
            
            <div className='race-type'>
                <span>{race.type[0]}</span>
                <span>{race.type[1]}</span>
            </div>
        </div>
    );
}

export default RaceComponent;
