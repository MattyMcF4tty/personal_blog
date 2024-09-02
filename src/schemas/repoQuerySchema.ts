export default class RepoQuery {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';

  /**
   * Creates a new RepoQuery.
   *
   * @param page - The current page of repositories. Defaults to `1`.
   * @param perPage - Number of repositories per page. Max is `100`. Defaults to `10`.
   * @param order - The order of the repositories. Can be `'asc'` or `'desc'`. Defaults to `'desc'`.
   */
  constructor(page: number = 1, perPage: number = 10, order: 'asc' | 'desc' = 'desc') {
    this.page = page;
    this.perPage = perPage > 100 ? 100 : perPage; // Cap perPage at 100
    this.order = order;
  }

  /* Converts the object to a usable query */
  toQueryString(): string {
    const params = new URLSearchParams();
    params.append('page', this.page.toString());
    params.append('per_page', this.perPage.toString());
    params.append('sort', 'updated');
    params.append('direction', this.order);
    return params.toString();
  }
}
