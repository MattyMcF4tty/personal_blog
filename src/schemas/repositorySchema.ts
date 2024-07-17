export default interface RepositorySchema {
  id: number;
  name: string;
  description: string | null;
  url: string;
  lastUpdate: string;
  createdAt: string;
}
