const prettyBytes = (bytes) => {
  let aux = bytes;
  let count = 0;
  while (aux > 1024) {
    aux /= 1024;
    count += 1;
  }
  let label = 'B';
  switch (count) {
    case 4:
      label = 'TB';
      break;
    case 3:
      label = 'GB';
      break;
    case 2:
      label = 'MB';
      break;
    case 1:
      label = 'KB';
      break;
    case 0:
    default:
      label = `B`;
      aux = bytes;
  }
  return `${Math.round(aux)} ${label}`;
};
export default prettyBytes;
