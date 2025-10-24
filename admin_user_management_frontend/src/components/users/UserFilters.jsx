import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * UserFilters
 * Provides search and filter controls for the users table.
 */
export default function UserFilters({ value, onChange }) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  function handleInput(e) {
    const { name, value } = e.target;
    setLocal((f) => ({ ...f, [name]: value }));
  }

  function apply() {
    onChange?.(local);
  }

  function reset() {
    const next = { search: '', role: '', status: '', sort: 'name_asc' };
    setLocal(next);
    onChange?.(next);
  }

  return (
    <div className="op-card op-filters">
      <div className="op-filters-grid">
        <Input
          label="Search"
          placeholder="Search by name or email"
          name="search"
          value={local.search}
          onChange={handleInput}
        />
        <Select label="Role" name="role" value={local.role} onChange={handleInput}>
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </Select>
        <Select label="Status" name="status" value={local.status} onChange={handleInput}>
          <option value="">Any status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <Select label="Sort by" name="sort" value={local.sort} onChange={handleInput}>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
          <option value="lastActive_desc">Last Active (newest)</option>
          <option value="lastActive_asc">Last Active (oldest)</option>
        </Select>
      </div>
      <div className="op-filters-actions">
        <Button variant="neutral" onClick={reset}>Reset</Button>
        <Button onClick={apply}>Apply</Button>
      </div>
    </div>
  );
}
