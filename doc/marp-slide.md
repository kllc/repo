---
marp: true
theme: base
style: |
  section {
      background-color: white;
      font-family: 'Noto Sans JP Light','Yu Gothic UI';
      color: #236;
  }
  section.top {
      background-color: RGB(26, 13, 171);
      color: #fff;
      font-size:4em;
      font-weight:bold;
  }
  section.top code {
      display:block;
      background: rgba(45,45,45, 0.7);
      padding: 0.4em;
      font-size:1.5em;
      opacity:1;
  }
  section.title {
      color: #fff;
      background-color: RGB(45, 45, 45,0.7);
      padding-left :40px;
      font-family: 'Noto Sans JP Regular','Yu Gothic UI';
  }
  section.slides {
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='680px' height='230px' preserveAspectRatio='none'><path d='M130,0l-70,110l70,110l50,0l-70,-110l70,-110H0Z' transform='translate(0 5)' fill='RGB(204,204,204)'/><path d='M0,0l0,220l50,0l0,-47.14285714l-40,-62.85714286l40,-62.85714286l0,-47.14285714H0Z' transform='translate(0 5)' fill='RGB(0,0,0)'/><path d='M50,0l0,47.14285714l30,-47.14285714H0Z' transform='translate(0 5)' fill='RGB(204,204,204)'/><path d='M50,220l0,-47.14285714l30,47.14285714H0Z' transform='translate(0 5)' fill='RGB(204,204,204)'/><text id='LLC' transform='translate(180 226)' font-size='316' font-family='SegoeUI-Bold, Segoe UI' font-weight='700'>LLC</text></svg>");
      background-repeat: no-repeat;
      background-position: top 10px right 10px;
      background-size: 220px;
  }    
  section.slides h1 {
      position : absolute;
      top: 40px;
      left: 20px;
      line-height:0px;
  }
  section.slides code {
      background-color: #FF6;
      font-family: 'Noto Sans JP Light','Yu Gothic UI';
  }
  section.eof {
      background-image: none;
      font-family: 'Noto Sans JP Regular','Yu Gothic UI';
      color: #000;
      text-align: center;
  }
  section.none {
      display:none;
  }    
  h1, h2 ,h3, h4 ,h5, h6 {
      line-height:0px;        
      font-family: 'Noto Sans JP Regular','Yu Gothic UI';
  }
  h6 {
      text-align: right;
      line-height:0px;
  }
---

<!-- class: slides -->

# 本書について

- 本書に記載した情報は、本書各項目に関する発行日現在の見解を表明するものです。当社は絶えず変化する市場に対応しなければならないため、ここに記載した情報に対していかなる責務を負うものではなく、提示された情報の信憑性については保証できません。

- 本書は情報提供のみを目的としています。明示的または暗示的を問わず、当社は本書にいかなる保証も与えるものではありません。

© 2022 KLLC All rights reserved.
記載されている会社名および製品名は、一般に各社の商標です。

<!-- 21.03.31 style部分をたたむときに、１ページ目がたたまれてしまうので、固定ページを追加した。　-->

---

<!--　class: top -->

`タイトルの文言１`

![bg brightness:0.8 contrast:120%](https://marp.app/assets/og-image.png)

<!-- Webの画像をそのままバックグラウンドに出来るのでいい感じ。 -->
<!-- brightness:0.8 contrast:120%　で色やコントラスト設定 -->

---

<!--
class: title
-->
<br>
<br>

Marp スライドドキュメント

## 凡例

![bg right:40%](https://dbdzm869oupei.cloudfront.net/img/sticker/large/8340.jpg)

<br>
<br>

---

<!--
class: slides
paginate: true
-->

# 凡例

`code`
_em_
**_strong_**
~~gfm~~

| header1    |     header2 |   header3    |
| :--------- | ----------: | :----------: |
| align left | align right | align center |
| a          |           b |      c       |

---

# f １

## f ２

### f ３

#### f ４

##### f ５

###### f ６

[リンク](https://memo.tyoshida.me/power-platform/powerapps/useful-websites-to-start-powerapps/)

---

# 凡例

- list
- list
  - list2
  - list2
    - list2
    - list2

1. 11
1. 11
   1. 22
   1. 22
      1. 33
      1. 33

---

# 凡例

```ruby
　class Hoge
　  def hoge
　    print 'hoge'
　  end
　end
```

```html
<body></body>
```

> aa
>
> > bb

    pre

```
aaa
```

---

<!--
class: eof
paginate: false
footer: Document Name © 2022 KLLC
-->

## Ｋ合同会社
