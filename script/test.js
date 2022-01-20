// (function (root, factory) {
//   if (typeof define === "function" && define.amd) {
//     // AMD
//     define(["myModule", "myOtherModule"], factory);
//   } else if (typeof exports === "object") {
//     // CommonJS
//     module.exports = factory(require("myModule"), require("myOtherModule"));
//   } else {
//     // Browser globals (Note: root is window)
//     root.returnExports = factory(root.myModule, root.myOtherModule);
//   }
// })(this, function (myModule, myOtherModule) {
//   // Methods
//   function notHelloOrGoodbye() {} // A private method
//   function hello() {
//     alert(1);
//   } // A public method because it's returned (see below)
//   function goodbye() {} // A public method because it's returned (see below)

//   // Exposed public methods
//   return {
//     Hello: hello,
//     Goodbye: goodbye,
//   };
// });

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node, CommonJS-like
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function ($) {
  //    methods
  function myFunc() {}

  //    exposed public method
  return myFunc;
});
