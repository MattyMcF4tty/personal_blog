export interface PageInfoSchema {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string | null;
  startCursor: string | null;
}
