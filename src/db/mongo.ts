import { MongoClient } from 'mongodb';
import { VITE_MONGODB_URI } from '$env/static/private';

const client = new MongoClient(VITE_MONGODB_URI);

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db();
