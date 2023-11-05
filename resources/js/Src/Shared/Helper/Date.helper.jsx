export const dateFormat = (stringDate) => {
  let date = new Date(stringDate);
  return date.toISOString().split('T')[0];
}