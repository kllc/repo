(function () {
  const div = document.getElementById("live-ec");
  const iframe = document.createElement("iframe");

  iframe.src =
    "https://kllc.github.io/repo/script/iframe.html?key=" +
    div.dataset.key +
    "&icon=" +
    div.dataset.icon;

  iframe.scrolling = "no";
  iframe.overflow = "hidden";
  iframe.style.opacity = 1;
  iframe.frameBorder = 0;
  iframe.marginWidth = 0;
  iframe.marginHeight = 0;
  iframe.style.zIndex = "2147483647";
  iframe.style.display = "block";
  iframe.style.position = "fixed";
  iframe.style.cursor = "pointer";
  iframe.style.backgroundColor = "white";
  iframe.style.overflow = "hidden";
  iframe.style.borderRadius = "50%";

  if (div.dataset.right) {
    iframe.style.right = div.dataset.right + "px";
  } else {
    iframe.style.right = "30px";
  }

  if (div.dataset.bottom) {
    iframe.style.bottom = div.dataset.bottom + "px";
  } else {
    iframe.style.bottom = "50px";
  }

  iframe.style.width = "100px";
  iframe.style.height = "100px";

  div.appendChild(iframe);
})();
