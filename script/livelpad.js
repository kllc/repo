export default (plan) => {
  if (plan) {
    switch (plan) {
      case "test":
        return 'Powered by <a href="https://livelp.net" target="_blank">Livelp</a>';
        break;
      default:
        return 'Powered by <a href="https://alivehub.net" target="_blank">Alive</a>';
        break;
    }
  } else {
    return "";
  }
};
