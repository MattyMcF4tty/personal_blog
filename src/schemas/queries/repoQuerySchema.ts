export interface RepoQueryProps {
  name: string;
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  sort: 'updated' | 'forks' | 'stars';
}

export default class RepoQuery implements RepoQueryProps {
  name: string;
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  sort: 'updated' | 'forks' | 'stars';

  /**
   * Creates a new RepoQuery. `ONLY TO BE USED SERVER SIDE`
   *
   * @param name - The letters that the name should contain. If none provided will return all repositories.
   * @param page - The current page of repositories. Defaults to `1`.
   * @param perPage - Number of repositories per page. Max is `100`. Defaults to `10`.
   * @param order - The order of the repositories. Can be `'asc'` or `'desc'`. Defaults to `'desc'`.
   * @param sort - The value to order by. Can be `'updated'`, `'forks'` or `'stars'`. Defaults to `'updated'`
   */
  constructor(
    name: string = '',
    page: number = 1,
    perPage: number = 10,
    order: 'asc' | 'desc' = 'desc',
    sort: 'updated' | 'forks' | 'stars' = 'updated'
  ) {
    this.name = name;
    this.page = page;
    this.perPage = perPage > 100 ? 100 : perPage; // Cap perPage at 100
    this.order = order;
    this.sort = sort;
  }

  /* Converts the object to a usable query */
  /* This is really sketcy but its what you have to doe when URLSearchParams INSIST on encoding f'ing `+` and `:` signs */
  toQueryString(): string {
    const query = `q=${encodeURIComponent(this.name)}+in:name+user:${process.env.GITHUB_USERNAME}`;
    const params = new URLSearchParams();
    params.append('page', this.page.toString());
    params.append('per_page', this.perPage.toString());
    params.append('sort', this.sort);
    params.append('order', this.order);
    return `${query}&${params.toString()}`;
  }
}
