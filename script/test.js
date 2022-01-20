// render-text-to-body.js

// 公開したい関数を定義
const renderTextToBody = (text) => {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const textNode = document.createTextNode(text);
  p.appendChild(textNode);
  div.appendChild(p);
  document.body.appendChild(div);
};

// 定義した関数を公開
export default renderTextToBody;
