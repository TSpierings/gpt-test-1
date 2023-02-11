export interface Flow {
	title: string;
	description: string;
	image: string;
	steps: Array<Step>;
}

export interface Step {
	title: string;
	inputs: Array<DataField>;
}

export interface DataField {
	name: string;
	label: string;
	rows: number;
	value: string;
}
export interface MutationOption {
	code: string;
	title: string;
	description: string;
	placeholder: string;
	enabled: boolean;
}

export interface SpeechSection {
	title: string;
	history: Array<string>;
	cursor: number;
}

export const Flows: Array<Flow> = [
	{
		title: 'Hackathon pitch',
		description: 'Create the perfect pitch for a hackathon project',
		image: 'A.jpg',
		steps: [
			{
				title: 'Intro',
				inputs: [
					{
						name: 'team-name',
						label: 'Team name',
						rows: 1,
						value: ''
					},
					{
						name: 'target-audience',
						label: 'Tell us something about your audience',
						rows: 4,
						value: 'The audience consists of fellow hackathon participants and some judges'
					},
					{
						name: 'voice-tone',
						label: 'Tone of voice',
						rows: 4,
						value: 'informal'
					},
					{
						name: 'description',
						label: 'Can you describe your idea, the more detail the better!',
						rows: 4,
						value: ''
					},
					{
						name: 'standout',
						label: 'What makes your idea stand out? ',
						rows: 4,
						value: 'The audience consists of fellow hackathon participants and some judges'
					}
				]
			},
			{
				title: 'Description',
				inputs: []
			}
		]
	},
	{
		title: 'Placeholder',
		description: 'Place the perfect holder for this description',
		image: 'C.jpg',
		steps: []
	},
	{
		title: 'Empty',
		description: '',
		image: 'B.jpg',
		steps: []
	}
];
