import { RepoQueryProps } from '@/schemas/queries/repoQuerySchema';
import RepositorySchema from '@/schemas/repositorySchema';
import { fetchUserRepos } from '@/utils/github';
import { useCallback, useEffect, useState } from 'react';

/**
 * A hook to handle fetching repositories on client side.
 */
export const useRepositories = ({ page, perPage, order, sort }: RepoQueryProps) => {
  /* Variables users can't change */
  const [repositories, setRepositories] = useState<RepositorySchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  /* Variables users can change */
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>(order);
  const [currentSort, setCurrentSort] = useState<'updated' | 'created'>(sort);

  /**
   * Fetches the repositories. Is a useCallback function therefore is only re-created if perPage changes.
   *
   * @param page The current page to fetch.
   * @param order The current order of the data.
   * @param sort The current way to sort the data.
   */
  const fetchRepos = useCallback(
    async (page: number, order: 'asc' | 'desc', sort: 'updated' | 'created') => {
      setLoading(true);
      setError(null);
      try {
        const repos = await fetchUserRepos(page, perPage, order, sort);
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
    fetchRepos(currentPage, currentOrder, currentSort);
  }, [currentPage, currentOrder, currentSort]);

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
  const updateSort = (newSort: 'updated' | 'created') => {
    setCurrentSort(newSort);
  };

  return {
    currentPage,
    loading,
    error,
    repositories,
    updatePage,
    updateOrder,
    updateSort,
  };
};
