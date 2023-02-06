export interface Flow {
  title: string;
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
    title: 'Simple',
    image: 'A.jpg',
    steps: [{
      title: 'Intro',
      inputs: [
        {
          name: 'team-name',
          label: 'Team name',
          rows: 1,
          value: 'Speechify'
        }, {
          name: 'speech-goal',
          label: 'Speech goal',
          rows: 4,
          value: 'Pitching an idea to a group of investors'
        }, {
          name: 'extra-intro-info',
          label: 'Extra introduction',
          rows: 4,
          value: 'This pitch should be short and energizing'
        }
      ]
    }, {
      title: 'Description',
      inputs: [
        {
          name: 'description',
          label: 'Project description',
          rows: 6,
          value: 'Speechify is an AI app that helps a person create a speech for a given use case'
        }, {
          name: 'extra-description-info',
          label: 'Extra description',
          rows: 4,
          value: ''
        }
      ]
    }]
  },
  {
    title: 'Complex',
    image: 'C.jpg',
    steps: []
  },
  {
    title: 'Empty',
    image: 'B.jpg',
    steps: []
  }
];
