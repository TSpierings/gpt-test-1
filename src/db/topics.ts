import type { PromptMatcher } from './../lib/speeches/matchers';
import db from '$db/mongo'

export const topics = db.collection<PromptMatcher>('topics');
