import apiClient from './apiClient';

/**
 * PUBLIC_INTERFACE
 * listUsers
 * Fetch a paginated and filtered list of users.
 * @param {{page?:number, pageSize?:number, search?:string, role?:string, status?:string, sort?:string}} params
 * @returns {Promise<{items: any[], total: number, page: number, pageSize: number}>}
 */
export async function listUsers(params = {}) {
  const query = new URLSearchParams();
  if (params.page != null) query.set('page', String(params.page));
  if (params.pageSize != null) query.set('pageSize', String(params.pageSize));
  if (params.search) query.set('search', params.search);
  if (params.role) query.set('role', params.role);
  if (params.status) query.set('status', params.status);
  if (params.sort) query.set('sort', params.sort);
  const q = query.toString();
  const { data } = await apiClient.get(`/api/users${q ? `?${q}` : ''}`);
  // Normalize response in case backend returns different keys
  if (data && Array.isArray(data.items)) return data;
  return {
    items: Array.isArray(data) ? data : (data?.results || []),
    total: data?.total || (Array.isArray(data) ? data.length : 0),
    page: params.page || 1,
    pageSize: params.pageSize || 10,
  };
}

/**
 * PUBLIC_INTERFACE
 * getUser
 * @param {string} id
 */
export async function getUser(id) {
  const { data } = await apiClient.get(`/api/users/${id}`);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * createUser
 * @param {{name:string,email:string,role:string,password:string,status?:string}} payload
 */
export async function createUser(payload) {
  const { data } = await apiClient.post(`/api/users`, payload);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * updateUser
 * @param {string} id
 * @param {{name?:string,email?:string,role?:string,status?:string,password?:string}} payload
 */
export async function updateUser(id, payload) {
  const { data } = await apiClient.put(`/api/users/${id}`, payload);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * deleteUser
 * @param {string} id
 */
export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/api/users/${id}`);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * toggleActive
 * @param {string} id
 * @param {boolean} active
 */
export async function toggleActive(id, active) {
  const { data } = await apiClient.patch(`/api/users/${id}/active`, { active });
  return data;
}

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  toggleActive,
};
