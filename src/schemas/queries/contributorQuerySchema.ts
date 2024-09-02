export default class ContributorQuery {
  repoName: string;
  page: number;
  perPage: number;

  /**
   * Creates a new ContributorQuery.
   * @param repoName - The name of the repository from which to fetch commits from. `Required`
   * @param page - The current page of contributors. Defaults to `1`.
   * @param perPage - Number of contributors per page. Max is `100`. Defaults to `10`.
   */
  constructor(repoName: string, page: number = 1, perPage: number = 10) {
    this.repoName = repoName;
    this.page = page;
    this.perPage = perPage > 100 ? 100 : perPage; // Cap perPage at 100
  }

  /* Converts the object to a usable query */
  toQueryString(): string {
    const params = new URLSearchParams();
    params.append('page', this.page.toString());
    params.append('per_page', this.perPage.toString());
    return params.toString();
  }
}
