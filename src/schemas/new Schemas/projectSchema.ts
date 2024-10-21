import { Languages, LanguagesSchema } from './languagesSchema';
import { Tags, TagsSchema } from './tagsSchema';
import { Watchers, WatchersSchema } from './watchersSchema';

export interface ProjectSchema {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  watchers: WatchersSchema;
  tags: TagsSchema;
  languages: LanguagesSchema;
}

export class Project implements ProjectSchema {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  watchers: Watchers;
  tags: Tags;
  languages: Languages;

  constructor(project: ProjectSchema) {
    this.id = project.id;
    this.name = project.name;
    this.url = project.url;
    this.description = project.description;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
    this.watchers = new Watchers(project.watchers);
    this.tags = new Tags(project.tags);
    this.languages = new Languages(project.languages);
  }

  toPlainObject(): ProjectSchema {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      watchers: this.watchers.toPlainObject(),
      tags: this.tags.toPlainObject(),
      languages: this.languages.toPlainObject(),
    };
  }
}
