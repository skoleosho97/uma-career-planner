import RaceComponent from './Race';
import { type Race, type umaData } from '../types';

const Races = ({ races, uma }: { races: Race[], uma: umaData }) => {
    return (
        <div className='container-races'>
        {races.length > 0 && (
            <>
                <h2>Junior Year</h2>
                {Object.values(races).filter(e => e.year[0] == 1).map((race: Race) => 
					<RaceComponent uma={uma} race={race} />
				)}
				<h2>Classic Year</h2>
				{Object.values(races).filter(e => e.year[0] == 2).map((race: Race) => 
					<RaceComponent uma={uma} race={race} />
				)}
				<h2>Senior Year</h2>
				{Object.values(races).filter(e => e.year[0] == 3).map((race: Race) => 
					<RaceComponent uma={uma} race={race} />					
				)}
            </>
        )}
        </div>
    );
}

export default Races;
