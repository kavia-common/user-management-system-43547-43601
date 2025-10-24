import { useCallback, useEffect, useMemo, useState } from 'react';
import { listUsers, createUser, updateUser, deleteUser, toggleActive as apiToggleActive } from '../services/usersApi';

/**
 * PUBLIC_INTERFACE
 * useUsers
 * Manages user listing, filters, pagination, and CRUD actions.
 */
export function useUsers() {
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    sort: 'name_asc',
  });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const params = useMemo(
    () => ({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...filters,
    }),
    [pagination.page, pagination.pageSize, filters]
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await listUsers(params);
      setItems(res.items || []);
      setPagination((p) => ({ ...p, total: res.total || 0 }));
    } catch (e) {
      setError(e?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onFilterChange = useCallback((patch) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPagination((p) => ({ ...p, page: 1 })); // reset page when filters change
  }, []);

  const onPageChange = useCallback((page) => setPagination((p) => ({ ...p, page })), []);
  const onPageSizeChange = useCallback((pageSize) => setPagination((p) => ({ ...p, page: 1, pageSize })), []);

  const onCreate = useCallback(
    async (payload) => {
      await createUser(payload);
      await fetchUsers();
    },
    [fetchUsers]
  );

  const onUpdate = useCallback(
    async (id, payload) => {
      await updateUser(id, payload);
      await fetchUsers();
    },
    [fetchUsers]
  );

  const onDelete = useCallback(
    async (id) => {
      await deleteUser(id);
      await fetchUsers();
    },
    [fetchUsers]
  );

  const onToggleActive = useCallback(
    async (id, active) => {
      // optimistic update
      setItems((prev) => prev.map((u) => (u.id === id ? { ...u, active } : u)));
      try {
        await apiToggleActive(id, active);
      } catch (e) {
        // rollback on error
        setItems((prev) => prev.map((u) => (u.id === id ? { ...u, active: !active } : u)));
        setError(e?.message || 'Failed to update status');
      }
    },
    []
  );

  return {
    items,
    loading,
    error,
    filters,
    pagination,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onCreate,
    onUpdate,
    onDelete,
    onToggleActive,
    refetch: fetchUsers,
  };
}

export default useUsers;
