export interface UserSchema {
  login: string;
  avatarUrl: string;
  url: string;
}

export class User implements UserSchema {
  login: string;
  avatarUrl: string;
  url: string;

  constructor(user: UserSchema) {
    this.login = user.login;
    this.avatarUrl = user.avatarUrl;
    this.url = user.url;
  }

  toPlainObject(): UserSchema {
    return {
      login: this.login,
      avatarUrl: this.avatarUrl,
      url: this.url,
    };
  }
}
