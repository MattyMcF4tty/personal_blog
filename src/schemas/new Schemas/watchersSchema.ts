import { User, UserSchema } from './userSchema';

export interface WatchersSchema {
  totalCount: number;
  users: UserSchema[];
}

export class Watchers implements WatchersSchema {
  totalCount: number;
  users: User[];

  constructor(watchers: WatchersSchema) {
    this.totalCount = watchers.totalCount;
    this.users = watchers.users.map((user) => new User(user));
  }

  toPlainObject(): WatchersSchema {
    return {
      totalCount: this.totalCount,
      users: this.users.map((user) => user.toPlainObject()),
    };
  }

  addWatcher(user: User) {
    this.users.push(user);
  }
}
