import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'http://localhost:3042';

export function useCRUD(resourceName, pluralName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${pluralName}`);
      const result = await response.json();
      setItems(result.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pluralName]);

  const create = async (data, hasFile = false) => {
    try {
      const options = {
        method: 'POST',
        headers: { ...getAuthHeaders() },
      };

      if (hasFile) {
        options.body = data; // FormData
      } else {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${BASE_URL}/${resourceName}`, options);
      const result = await response.json();
      if (result.status === 'ok') {
        await fetchAll();
        return { success: true, data: result.data };
      }
      return { success: false, error: result.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const update = async (data, hasFile = false) => {
    try {
      const options = {
        method: 'PUT',
        headers: { ...getAuthHeaders() },
      };

      if (hasFile) {
        options.body = data; // FormData
      } else {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${BASE_URL}/${resourceName}`, options);
      const result = await response.json();
      if (result.status === 'ok') {
        await fetchAll();
        return { success: true, data: result.data };
      }
      return { success: false, error: result.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const remove = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${resourceName}/${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() },
      });
      const result = await response.json();
      if (result.status === 'ok') {
        await fetchAll();
        return { success: true };
      }
      return { success: false, error: result.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { items, loading, error, create, update, remove, refetch: fetchAll };
}
