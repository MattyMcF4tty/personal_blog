export interface LanguagesSchema {
  languages: string[];
}

export class Languages implements LanguagesSchema {
  languages: string[];

  constructor(languages: LanguagesSchema) {
    this.languages = languages.languages;
  }

  toPlainObject() {
    return {
      languages: this.languages,
    };
  }
}
