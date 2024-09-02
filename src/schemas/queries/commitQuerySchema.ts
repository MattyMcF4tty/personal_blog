export default class CommitQuery {
  name: string;
  page: number;
  perPage: number;

  /**
   * Creates a new CommitQuery.
   * @param name - The name of the repository from which to fetch commits from. `Required`
   * @param page - The current page of commits. Defaults to `1`.
   * @param perPage - Number of commits per page. Max is `100`. Defaults to `10`.
   */
  constructor(name: string, page: number = 1, perPage: number = 10) {
    this.name = name;
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
