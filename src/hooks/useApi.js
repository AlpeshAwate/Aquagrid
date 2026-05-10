import { useState, useEffect } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('[useApi] Initializing with dependencies:', dependencies);

  useEffect(() => {
    console.log('[useApi] useEffect triggered');
    let mounted = true;
    
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        if (mounted) {
          console.log('[useApi] Data loaded:', result);
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          console.error('[useApi] Error:', err.message);
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDataAsync();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies.length > 0 ? [...dependencies] : []);

  return { data, loading, error, refetch: () => setLoading(true) };
};

export const useWebSocket = (url, enabled = true) => {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    
    const ws = new WebSocket(url);
    
    ws.onopen = () => setConnected(true);
    ws.onmessage = (event) => setData(JSON.parse(event.data));
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    return () => ws.close();
  }, [url, enabled]);

  return { data, connected };
};
