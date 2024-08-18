import userSchema from './userSchema';

export default interface CommitSchema {
  sha: string;
  title: string;
  description: string | string[];
  date: string;
  url: string;
  committer: userSchema;
}
