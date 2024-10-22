import { Commit, CommitSchema } from './commitSchema';
import { PageInfoSchema } from './pageInfoSchema';

export interface PagedCommitsSchema {
  totalCount: number;
  commits: CommitSchema[];
  pageInfo: PageInfoSchema;
}

export class PagedCommits implements PagedCommitsSchema {
  totalCount: number;
  commits: Commit[];
  pageInfo: PageInfoSchema;

  constructor(pagedCommits: PagedCommitsSchema) {
    this.totalCount = pagedCommits.totalCount;
    this.commits = pagedCommits.commits.map((commit) => new Commit(commit));
    this.pageInfo = pagedCommits.pageInfo;
  }

  toPlainObject(): PagedCommitsSchema {
    return {
      totalCount: this.totalCount,
      commits: this.commits.map((commit) => commit.toPlainObject()),
      pageInfo: this.pageInfo,
    };
  }
}
