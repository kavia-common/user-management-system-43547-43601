import React, { useMemo, useState } from 'react';
import UserFilters from '../components/users/UserFilters';
import UsersTable from '../components/users/UsersTable';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import UserForm from '../components/users/UserForm';
import useUsers from '../hooks/useUsers';

/**
 * PUBLIC_INTERFACE
 * UsersPage
 * Main page for managing users: filters, table, pagination, and forms.
 */
export default function UsersPage() {
  const {
    items,
    loading,
    error,
    filters,
    pagination,
    onFilterChange,
    onPageChange,
    onCreate,
    onUpdate,
    onDelete,
    onToggleActive,
  } = useUsers();

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);

  function openCreate() {
    setEditingUser(null);
    setFormOpen(true);
  }
  function openEdit(u) {
    setEditingUser(u);
    setFormOpen(true);
  }
  function openDelete(u) {
    setConfirmTarget(u);
    setConfirmOpen(true);
  }
  function openStatusToggle(u, nextActive) {
    setStatusTarget({ user: u, nextActive });
    setStatusConfirmOpen(true);
  }

  async function submitForm(payload) {
    if (editingUser && editingUser.id) {
      await onUpdate(editingUser.id, payload);
    } else {
      await onCreate(payload);
    }
  }

  const headerSubtitle = useMemo(() => {
    const total = pagination.total || 0;
    return `${total} user${total === 1 ? '' : 's'}`;
  }, [pagination.total]);

  return (
    <div className="op-page">
      <div className="op-page-header">
        <div>
          <h1 className="op-title">Users</h1>
          <p className="op-subtitle">{headerSubtitle}</p>
        </div>
        <div className="op-actions">
          <Button onClick={openCreate}>Create User</Button>
        </div>
      </div>

      <UserFilters value={filters} onChange={onFilterChange} />

      {error && <div className="op-alert-error" role="alert">{error}</div>}

      <UsersTable
        items={items}
        loading={loading}
        onEdit={openEdit}
        onDelete={openDelete}
        onToggleActive={(u, next) => openStatusToggle(u, next)}
      />

      <div className="op-footer">
        <Pagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={onPageChange}
        />
      </div>

      <UserForm
        open={formOpen}
        user={editingUser}
        onClose={() => setFormOpen(false)}
        onSubmit={submitForm}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${confirmTarget?.name || 'this user'}? This action cannot be undone.`}
        confirmText="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          await onDelete(confirmTarget.id);
          setConfirmOpen(false);
          setConfirmTarget(null);
        }}
      />

      <ConfirmDialog
        open={statusConfirmOpen}
        title={statusTarget?.nextActive ? 'Activate User' : 'Deactivate User'}
        message={
          statusTarget?.nextActive
            ? `Activate ${statusTarget?.user?.name}?`
            : `Deactivate ${statusTarget?.user?.name}? They will lose access.`
        }
        confirmText={statusTarget?.nextActive ? 'Activate' : 'Deactivate'}
        onCancel={() => {
          setStatusConfirmOpen(false);
          setStatusTarget(null);
        }}
        onConfirm={async () => {
          await onToggleActive(statusTarget.user.id, statusTarget.nextActive);
          setStatusConfirmOpen(false);
          setStatusTarget(null);
        }}
      />
    </div>
  );
}
