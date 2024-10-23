import { PageInfoSchema } from './pageInfoSchema';
import { User, UserSchema } from './userSchema';

export interface PagedWatchersSchema {
  totalCount: number;
  users: UserSchema[];
  pageInfo: PageInfoSchema;
}

export class PagedWatchers implements PagedWatchersSchema {
  totalCount: number;
  users: User[];
  pageInfo: PageInfoSchema;

  constructor(watchers: PagedWatchersSchema) {
    this.totalCount = watchers.totalCount;
    this.users = watchers.users.map((user) => new User(user));
    this.pageInfo = watchers.pageInfo;
  }

  toPlainObject(): PagedWatchersSchema {
    return {
      totalCount: this.totalCount,
      users: this.users.map((user) => user.toPlainObject()),
      pageInfo: this.pageInfo,
    };
  }

  addWatcher(user: User) {
    this.users.push(user);
  }
}
