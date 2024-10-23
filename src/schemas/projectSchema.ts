import { Collaborators, CollaboratorsSchema } from './collaboratorsSchema';
import { Languages, LanguagesSchema } from './languagesSchema';
import { PagedCommits, PagedCommitsSchema } from './pagedCommitsSchema';
import { PagedWatchers, PagedWatchersSchema } from './pagedWatchersSchema';
import { Tags, TagsSchema } from './tagsSchema';

export interface ProjectSchema {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  watchers: PagedWatchersSchema;
  collaborators: CollaboratorsSchema;
  tags: TagsSchema;
  languages: LanguagesSchema;
  commits: PagedCommitsSchema;
}

export class Project implements ProjectSchema {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  watchers: PagedWatchers;
  collaborators: Collaborators;
  tags: Tags;
  languages: Languages;
  commits: PagedCommits;

  constructor(project: ProjectSchema) {
    this.id = project.id;
    this.name = project.name;
    this.url = project.url;
    this.description = project.description;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
    this.watchers = new PagedWatchers(project.watchers);
    this.collaborators = new Collaborators(project.collaborators);
    this.tags = new Tags(project.tags);
    this.languages = new Languages(project.languages);
    this.commits = new PagedCommits(project.commits);
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
      collaborators: this.collaborators.toPlainObject(),
      tags: this.tags.toPlainObject(),
      languages: this.languages.toPlainObject(),
      commits: this.commits.toPlainObject(),
    };
  }
}
