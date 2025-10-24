//
// apiClient.js - Lightweight API client using fetch with base URL and auth header support
//

/**
 * PUBLIC_INTERFACE
 * createApiClient
 * Creates a small wrapper around fetch adding base URL, JSON handling, and auth injection.
 */
export function createApiClient() {
  /** Resolve base URL from env; allow relative URLs if missing. */
  const baseURL = process.env.REACT_APP_API_BASE_URL || '';

  /** Retrieve token using indirection key from env if available. */
  function getAuthToken() {
    const tokenKey = process.env.REACT_APP_AUTH_TOKEN_KEY;
    if (tokenKey && typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem(tokenKey) || '';
      } catch {
        return '';
      }
    }
    return '';
  }

  /**
   * PUBLIC_INTERFACE
   * request
   * Performs a fetch call with JSON headers and optional body. Adds Authorization header if token is present.
   * @param {string} url - relative or absolute path
   * @param {RequestInit} options - fetch options
   * @returns {Promise<{data:any, status:number, ok:boolean}>}
   */
  async function request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');

    const token = getAuthToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(fullUrl, { ...options, headers });
    const contentType = res.headers.get('content-type') || '';
    let data = null;
    try {
      data = contentType.includes('application/json') ? await res.json() : await res.text();
    } catch {
      data = null;
    }
    if (!res.ok) {
      const err = new Error((data && data.message) || `Request failed with status ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return { data, status: res.status, ok: res.ok };
  }

  return {
    request,
    get: (url, options = {}) => request(url, { ...options, method: 'GET' }),
    post: (url, body, options = {}) =>
      request(url, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
    put: (url, body, options = {}) =>
      request(url, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
    patch: (url, body, options = {}) =>
      request(url, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
    delete: (url, options = {}) => request(url, { ...options, method: 'DELETE' }),
  };
}

const apiClient = createApiClient();
export default apiClient;
