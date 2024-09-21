import { RepoQueryProps } from '@/schemas/queries/repoQuerySchema';
import RepositorySchema from '@/schemas/repositorySchema';
import { queryRepos } from '@/utils/github';
import { useCallback, useEffect, useState } from 'react';

/**
 * A hook to handle fetching repositories on client side.
 */
export const useRepositories = ({ name, page, perPage, order, sort }: RepoQueryProps) => {
  /* Variables users can't change */
  const [repositories, setRepositories] = useState<RepositorySchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  /* Variables users can change */
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>(order);
  const [currentSort, setCurrentSort] = useState<'updated' | 'forks' | 'stars'>(sort);
  const [currentName, setCurrentName] = useState<string>(name);

  /**
   * Fetches the repositories. Is a useCallback function therefore is only re-created if perPage changes.
   *
   * @param name The letters the name should contain.
   * @param page The current page to fetch.
   * @param order The current order of the data.
   * @param sort The current way to sort the data.
   */
  const fetchRepos = useCallback(
    async (
      name: string,
      page: number,
      order: 'asc' | 'desc',
      sort: 'updated' | 'forks' | 'stars'
    ) => {
      setLoading(true);
      setError(null);
      try {
        const repos = await queryRepos(name, page, perPage, order, sort);
        setRepositories(repos);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  ); /*  Tell it to only re-create the function if perPage is changed */

  /* Fetches updated data whenever currentPage, currentOrder or currentSort is changed. */
  useEffect(() => {
    fetchRepos(currentName, currentPage, currentOrder, currentSort);
  }, [currentName, currentPage, currentOrder, currentSort, fetchRepos]);

  /**
   * Updates what the letters from which to query the names with.
   * @param newName The new letters to query for names with
   */
  const updateName = (newName: string) => {
    setCurrentName(newName);
  };
  /**
   * Updates what page to load.
   * @param newPage The new page to fetch
   */
  const updatePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
  /**
   * Updates the way the data is ordered.
   * @param newOrder The new way to order the data. Can be `asc` or `desc`
   */
  const updateOrder = (newOrder: 'asc' | 'desc') => {
    setCurrentOrder(newOrder);
  };
  /**
   * Updates the way the data is sorted.
   * @param newSort The new way to sort the data. Can be `updated` or `created`
   */
  const updateSort = (newSort: 'updated' | 'forks' | 'stars') => {
    setCurrentSort(newSort);
  };

  return {
    currentPage,
    currentOrder,
    currentSort,
    loading,
    error,
    repositories,
    updatePage,
    updateOrder,
    updateSort,
    updateName,
  };
};
