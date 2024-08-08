import userSchema from './userSchema';

export default interface CommitSchema {
  title: string;
  description: string;
  date: string;
  url: string;
  committer: userSchema;
}
