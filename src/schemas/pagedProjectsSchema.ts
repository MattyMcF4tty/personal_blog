import { PageInfoSchema } from './pageInfoSchema';
import { Project, ProjectSchema } from './projectSchema';

export interface PagedProjectsSchema {
  totalCount: number;
  projects: ProjectSchema[];
  pageInfo: PageInfoSchema;
}

export class PagedProjects implements PagedProjectsSchema {
  totalCount: number;
  projects: Project[];
  pageInfo: PageInfoSchema;

  constructor(projects: PagedProjectsSchema) {
    this.totalCount = projects.totalCount;
    this.projects = projects.projects.map((project) => new Project(project));
    this.pageInfo = projects.pageInfo;
  }

  toPlainObject(): PagedProjectsSchema {
    return {
      totalCount: this.totalCount,
      projects: this.projects.map((project) => project.toPlainObject()),
      pageInfo: this.pageInfo,
    };
  }

  addProject(project: Project) {
    this.projects.push(project);
  }
}
