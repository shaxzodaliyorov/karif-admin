export const useGetRole = () => {
  const role = localStorage.getItem("role");
  return role || null;
};
