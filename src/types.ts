export type umaData = {
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

export const defaultUma = {
    "name": ["Umamusume", "Umamusume"],
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
}

export interface Race {
	name: string;
	year: number[];
	type: string[];
	sparks: string[];
	logo: string;
}

export const sparks: string[] = ["speed", "stamina", "power", "guts", "wit"];
export const courses: string[] = ["hanshin", "nakayama", "tokyo", "oi", "chukyo", "kyoto", "standard", "nonstandard"];
export const seasons: string[] = ["fall", "summer", "spring", "winter"];
export const weather: string[] = ['rainy', 'cloudy', 'sunny', 'snowy'];
export const months: string[] = 
	[
		"January", "February", "March", "April", 
		"May", "June", "July", "August", 
		"September", "October", "November", "December"
	];
