export interface CommitSchema {
  message: string;
  url: string;
  commitedDate: string;
}

export class Commit implements CommitSchema {
  message: string;
  url: string;
  commitedDate: string;

  constructor(commit: CommitSchema) {
    this.message = commit.message;
    this.url = commit.url;
    this.commitedDate = commit.commitedDate;
  }

  toPlainObject(): CommitSchema {
    return {
      message: this.message,
      url: this.url,
      commitedDate: this.commitedDate,
    };
  }
}
