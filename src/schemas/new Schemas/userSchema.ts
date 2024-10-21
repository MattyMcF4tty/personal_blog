export interface UserSchema {
  name: string;
  avatarUrl: string;
  url: string;
}

export class User implements UserSchema {
  name: string;
  avatarUrl: string;
  url: string;

  constructor(user: UserSchema) {
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
    this.url = user.url;
  }

  toPlainObject(): UserSchema {
    return {
      name: this.name,
      avatarUrl: this.avatarUrl,
      url: this.url,
    };
  }
}
