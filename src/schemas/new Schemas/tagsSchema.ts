export interface TagsSchema {
  totalCount: number;
  tags: string[];
}

export class Tags implements TagsSchema {
  totalCount: number;
  tags: string[];

  constructor(tags: TagsSchema) {
    this.totalCount = tags.totalCount;
    this.tags = tags.tags;
  }

  toPlainObject(): TagsSchema {
    return {
      totalCount: this.totalCount,
      tags: this.tags,
    };
  }
}
