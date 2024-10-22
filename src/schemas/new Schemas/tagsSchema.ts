import { PageInfoSchema } from './pageInfoSchema';

export interface TagsSchema {
  totalCount: number;
  tags: string[];
  pageInfo: PageInfoSchema;
}

export class Tags implements TagsSchema {
  totalCount: number;
  tags: string[];
  pageInfo: PageInfoSchema;

  constructor(tags: TagsSchema) {
    this.totalCount = tags.totalCount;
    this.tags = tags.tags;
    this.pageInfo = tags.pageInfo;
  }

  toPlainObject(): TagsSchema {
    return {
      totalCount: this.totalCount,
      tags: this.tags,
      pageInfo: this.pageInfo,
    };
  }
}
