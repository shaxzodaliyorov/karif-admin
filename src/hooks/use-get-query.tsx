export const useGetQuery = ({ value }: { value: string }) => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get(value);
  return id ? Number(id) : undefined;
};
