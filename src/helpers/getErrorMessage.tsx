export const getErrorMessage = ({ error, message }) => {
  const msg = error?.response?.data?.error ?? message;
  return msg;
};
