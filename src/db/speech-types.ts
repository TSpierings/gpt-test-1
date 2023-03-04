import type { PromptMatcher } from './../lib/speeches/matchers';
import db from '$db/mongo'

export const speechTypes = db.collection<PromptMatcher>('speech-types');
