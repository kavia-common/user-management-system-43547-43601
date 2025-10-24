import React, { useEffect, useMemo, useRef, useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * UserForm
 * Modal form for creating and editing a user.
 */
export default function UserForm({ open, user, onClose, onSubmit }) {
  const isEdit = !!(user && user.id);
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    status: 'active',
  });
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (open) {
      setErrors({});
      setTimeout(() => firstFieldRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (user && open) {
      setValues({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        password: '',
        status: user.active ? 'active' : 'inactive',
      });
    } else if (open) {
      setValues({ name: '', email: '', role: 'user', password: '', status: 'active' });
    }
  }, [user, open]);

  const modalTitle = useMemo(() => (isEdit ? 'Edit User' : 'Create User'), [isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Name is required';
    if (!values.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = 'Invalid email format';
    }
    if (!isEdit) {
      if (!values.password.trim()) {
        errs.password = 'Password is required';
      } else if (values.password.length < 6) {
        errs.password = 'Password must be at least 6 characters';
      }
    } else if (values.password && values.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  }

  async function submit(e) {
    e?.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      role: values.role,
      status: values.status,
    };
    if (values.password) payload.password = values.password;
    await onSubmit?.(payload);
    onClose?.();
  }

  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="op-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="user-form-title" onMouseDown={onBackdrop}>
      <form className="op-modal" onSubmit={submit}>
        <h3 id="user-form-title" className="op-modal-title">{modalTitle}</h3>
        <div className="op-modal-body">
          <Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            ref={firstFieldRef}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            type="email"
          />
          <Select label="Role" name="role" value={values.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </Select>
          <Select label="Status" name="status" value={values.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          <Input
            label={isEdit ? 'Password (optional)' : 'Password'}
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            type="password"
          />
        </div>
        <div className="op-modal-actions">
          <Button variant="neutral" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">{isEdit ? 'Save Changes' : 'Create User'}</Button>
        </div>
      </form>
    </div>
  );
}
