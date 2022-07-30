export default (plan) => {
  if (plan) {
    switch (plan) {
      case "test":
        return 'Powered by <a href="https://livelp.net" target="_blank">Livelp</a>';
      default:
        return 'Powered by <a href="https://livelp.net" target="_blank">Livelp.net</a>';
        break;
    }
  } else {
    return "";
  }
};
