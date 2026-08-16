import { useCallback, useState } from 'react';

function useReload(duration = 1000) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), duration);
  }, [duration]);

  return { refreshing, onRefresh };
}

export default useReload;
