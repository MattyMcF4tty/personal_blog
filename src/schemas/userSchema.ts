export default interface userSchema {
  id: number;
  name: string | null;
  username: string;
  repositories: number | null;
  profileUrl: string;
  avatar: string;
}
