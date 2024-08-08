import userSchema from './userSchema';

export default interface ContributorSchema extends userSchema {
  contributions: number;
}
