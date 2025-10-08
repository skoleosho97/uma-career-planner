import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

import g1_races from '../g1_races.json'
import umas from '../umas.json'

import './style.css'

type umaData = {
    name: string[];
    name_jp: string;
    icon: string;
    stats: {
        surface: {
            dirt: string;
            turf: string;
        };
        distance: {
            sprint: string;
            mile: string;
            medium: string;
            long: string;
        };
        strategy: {
            front: string;
            pace: string;
            late: string;
            end: string;
        };
    };
    career: (string | number)[][];
}

interface Race {
	name: string;
	year: number[];
	type: string[];
	sparks: string[];
	logo: string;
}

const months: string[] = 
	[
		"January", "February", "March", "April", 
		"May", "June", "July", "August", 
		"September", "October", "November", "December"
	];
const courses: string[] = ["hanshin", "nakayama", "tokyo", "oi", "chukyo", "kyoto", "standard", "nonstandard"];
const seasons: string[] = ["fall", "summer", "spring", "winter"];
const sparks: string[] = ["speed", "stamina", "power", "guts", "wit"];

const emptyRaces: Race[] = [];
const emptySparks: string[] = [];

const toggleUmaSuggest = () => {
	let input: Element = document.getElementsByClassName('uma-selected-name')[0]

	if (input) {
		if ((input as HTMLInputElement).disabled) {
			(input as HTMLInputElement).disabled = false;
			(input as HTMLInputElement).focus();

			let list: Element = document.getElementsByClassName('uma-suggestions')[0]
			if (list) (list as HTMLElement).style.display = 'block'
		} else {
			(input as HTMLInputElement).disabled = true;

			let list: Element = document.getElementsByClassName('uma-suggestions')[0]
			if (list) (list as HTMLElement).style.display = 'none'
		}
	}
}

const careerPlanner = (uma: umaData, min: string, sparks: string[]) => {
	// json to string
	let jsonString: string = JSON.stringify(g1_races);
	// parse string to json to type as interface
	let parsed = JSON.parse(jsonString);
	// get all races
	let races: Race[] = Object.values(parsed);
	// get all uma career races
	let uma_races: (string | number)[][] = uma.career;
	// set full career
	let career_races: Race[] = [];

	for (let i = 0; i < races.length; i++) {
		let race: Race = races[i];
		let turn = (12*((race.year[0]-1)*2)+1) + ((race.year[1]*2)-2) + (race.year[2]-1);

		// if race already exists with career
		if (uma_races.some(e => e[0] == race.name)) {
			career_races.push(race);
		}

		// if race can be ran
		if (
			!(uma_races.some(e => e[0] == race.name)) &&
			!(uma_races.some(e => e[2] == turn)) &&
			(uma.stats.surface[race.type[0].toLowerCase() as keyof object] as string) == 'A' &&
			(uma.stats.distance[race.type[1].toLowerCase() as keyof object] as string) <= min
		) {
			if (sparks.length == 0) {
				career_races.push(race);
			} else {
				if (race.sparks.some(e => sparks.includes(e))) career_races.push(race);
			}
		}
	}

	return career_races;
}

const displaySparkImg = (spark: string) => {
	if (courses.some(e => e == spark)) {
		return (
  			<img src='/src/assets/stat_icon/skill_sta.png'/>
		)
	}

	if (seasons.some(e => e == spark)) {
		return (
  			<img src='/src/assets/stat_icon/skill_spd.png'/>
		)
	}

	return (
  		<img src={`/src/assets/stat_icon/${spark}.png`}/>
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
		<div className='race-wrapper'>
			<div className='race-logo'>
				<img src={`/src/assets/races/${race.logo}.png`} />
			</div>
			<div className='race-name'>				
				<div className='race-sparks'>
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
	)
}

const App = () => {
	const [umaA, setUmaA] = useState({
        "name": ["", "Umamusume A"],
        "name_jp": "",
		"icon": "default",
        "stats": {
            "surface": {
                "dirt": "G",
                "turf": "G"
            },
            "distance": {
                "sprint": "E",
                "mile": "E",
                "medium": "E",
                "long": "E"
            },
            "strategy": {
                "front": "E",
                "pace": "E",
                "late": "E",
                "end": "E"
            }
		},
		"career": [
			["", 0, 0]
		]
	});
	const [races, setRaces] = useState(emptyRaces);
	const [filter, setFilter] = useState(emptySparks);
	const [minimum, setMinimum] = useState('A');

	return (
		<div className='wrap'>
			<div className='header'>
				<div className='uma'>
					<div 
						className='uma-icon'
						onClick={() => toggleUmaSuggest()}
					>
						<img src={`/src/assets/umas/${umaA.icon}.png`} />
					</div>
					<div className='uma-name'>
						<div className='uma-selector'>
							<input 
								type='text' 
								className='uma-selected-name' 
								value={umaA.name[1]} 
								disabled 
							/>
							<ul className='uma-suggestions'>
								{Object.entries(umas).map(([key, value]) => 
									<li 
										className='uma-suggestion' 
										key={key}
										onClick={() => {
											setUmaA(value)
											setRaces(careerPlanner(value, minimum, filter))
											toggleUmaSuggest()
										}}
									>
										[{value.name[0]}]&nbsp;{value.name[1]}
									</li>
								)}
							</ul>
						</div>
						<div><span className='uma-selected-subname'>{umaA.name[0]}</span></div>
					</div>
				</div>
				<div className='uma-aptitude'>
					<label htmlFor="">Select minimum distance aptitude</label>
					<select defaultValue={minimum} onChange={e => setMinimum(e.target.value)}>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
				</div>
				<div className='uma-stats'>
					<label htmlFor="">Select desired sparks</label>
					<div>
					{sparks.map((spark) => 
						<div className='stat'>
							<input type="checkbox" value={spark} onChange={e => {
								if (e.target.checked) {
									setFilter(
										[
											...filter,
											e.target.value
										]
									)
								} else {
									setFilter(filter.filter(x => x !== e.target.value))
								}
							}}/>
							<label htmlFor=""><img src={`/src/assets/stat_icon/${spark}.png`} /></label>
						</div>				
					)}
					</div>
				</div>
			</div>
			<div className='uma-career-races'>
				<h2>Junior Year</h2>
				{Object.values(races).filter(e => e.year[0] == 1).map((race: Race) => 
					<RaceComponent uma={umaA} race={race} />
				)}
				<h2>Classic Year</h2>
				{Object.values(races).filter(e => e.year[0] == 2).map((race: Race) => 
					<RaceComponent uma={umaA} race={race} />
				)}
				<h2>Senior Year</h2>
				{Object.values(races).filter(e => e.year[0] == 3).map((race: Race) => 
					<RaceComponent uma={umaA} race={race} />					
				)}
			</div>
		</div>
	)
}

export default App;
