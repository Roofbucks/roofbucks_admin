export const getErrorMessage = ({ error, message }) => {
  const msg = error?.response?.data?.error ??error?.response?.data?.message ?? message;
  return msg;
};
