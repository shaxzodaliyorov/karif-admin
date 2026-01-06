import { useLocation, useNavigate } from 'react-router-dom';

export const useQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const get = (key: string) => {
    return searchParams.get(key);
  };

  const getAll = () => {
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const set = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const remove = (key: string) => {
    searchParams.delete(key);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const clear = () => {
    navigate({ search: '' }, { replace: true });
  };

  return { get, getAll, set, remove, clear };
};
