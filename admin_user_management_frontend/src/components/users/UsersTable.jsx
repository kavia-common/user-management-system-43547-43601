import React from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * UsersTable
 * Renders the users list with actions.
 */
export default function UsersTable({ items, loading, onEdit, onDelete, onToggleActive }) {
  return (
    <div className="op-card">
      <div className="op-table-responsive">
        <table className="op-table" aria-busy={loading} aria-live="polite">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="op-table-loading">Loading...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="op-table-empty">No users found</td>
              </tr>
            ) : (
              items.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td className="op-text-muted">{u.email}</td>
                  <td><Badge color="primary">{u.role}</Badge></td>
                  <td>
                    {u.active ? <Badge color="success">Active</Badge> : <Badge color="gray">Inactive</Badge>}
                  </td>
                  <td>{u.lastActive ? new Date(u.lastActive).toLocaleString() : '-'}</td>
                  <td className="op-table-actions">
                    <Button variant="ghost" size="sm" onClick={() => onEdit?.(u)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete?.(u)}>Delete</Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onToggleActive?.(u, !u.active)}
                      aria-pressed={u.active}
                    >
                      {u.active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
