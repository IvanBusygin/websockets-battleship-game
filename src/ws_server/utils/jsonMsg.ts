export const getJsonMsg = (type: string, data: object) => {
  const result = JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  });

  return result;
};
