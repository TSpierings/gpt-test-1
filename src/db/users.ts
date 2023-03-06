import db from '$db/mongo'
import type { User } from '$lib/models/user';

export const users = db.collection<User>('users');
