export interface PitchPromptData {
  intro: PitchIntro,
  input: PitchSpecificInput
};

export interface PitchIntro {
  companyName: string;
  productDescription: string;
  solvingProblem: string;
  features: string;
  targetAudience: string;
}

export interface PitchSpecificInput {
  speechGoal: string;
  audienceSpecifics: string;
  extraInfo: string;
  speechDuration: string;
}

export const ProcessPitchIntro = (data: PitchIntro): string => {
  return `You are writing a pitch for a hackathon project
    The team name is ${data.companyName}.
    The product is about ${data.productDescription}.
    What problem we solve is ${data.solvingProblem}.
    Our product has the following features; ${data.features}.
    Our users are ${data.targetAudience}.
  `.trimEnd();
}

export const ProcessPitchSpeech = (data: PitchSpecificInput): string => {
  return `We make this pitch to ${data.speechGoal}.
    Some more information about our audience today; ${data.audienceSpecifics}.
    Extra requirements: ${data.extraInfo}.
    The pitch should take about ${data.speechDuration}.
  `.trimEnd();
}
