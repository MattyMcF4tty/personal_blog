import userSchema from '../userSchema';
import { PageInfoSchema } from './pageInfoSchema';
import { User, UserSchema } from './userSchema';

export interface CollaboratorsSchema {
  totalCount: number;
  users: UserSchema[];
  pageInfo: PageInfoSchema;
}

export class Collaborators implements CollaboratorsSchema {
  totalCount: number;
  users: User[];
  pageInfo: PageInfoSchema;

  constructor(collaborators: CollaboratorsSchema) {
    this.totalCount = collaborators.totalCount;
    this.users = collaborators.users.map((user) => new User(user));
    this.pageInfo = collaborators.pageInfo;
  }

  toPlainObject(): CollaboratorsSchema {
    return {
      totalCount: this.totalCount,
      users: this.users.map((user) => user.toPlainObject()),
      pageInfo: this.pageInfo,
    };
  }

  addCollaborator(user: User) {
    this.users.push(user);
  }
}
