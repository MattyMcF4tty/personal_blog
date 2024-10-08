import userSchema from './userSchema';

export default interface RepositorySchema {
  id: number;
  name: string;
  description: string | null;
  url: string;
  lastUpdate: string;
  createdAt: string;
  readMe: string | null;
  stars: number;
  watchers: number;
  forks: number;
  owner: userSchema;
  topics: string[];
}
