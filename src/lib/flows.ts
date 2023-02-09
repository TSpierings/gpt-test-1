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

export const Flows: Array<Flow> = [
  {
    title: 'Hackathon pitch',
    description: 'Create the perfect pitch for a hackathon project',
    image: 'A.jpg',
    steps: [{
      title: 'Intro',
      inputs: [
        {
          name: 'team-name',
          label: 'Team name',
          rows: 1,
          value: 'Speeching.ai'
        }, {
          name: 'target-audience',
          label: 'Target audience',
          rows: 4,
          value: 'A panel of investors at a hackathon event'
        }
      ]
    }, {
      title: 'Description',
      inputs: [
        {
          name: 'description',
          label: 'Project description',
          rows: 6,
          value: 'Speeching.ai is an AI app that helps a person create a speech for a given use case'
        }, {
          name: 'speech-goal',
          label: 'Speech goal',
          rows: 6,
          value: 'Show people at the event how cool our idea is'
        }, {
          name: 'extra-description-info',
          label: 'Extra description',
          rows: 4,
          value: ''
        }, {
          name: 'speech-length',
          label: 'Speech length',
          rows: 1,
          value: 'The speech can last 5 minutes'
        }
      ]
    }]
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
