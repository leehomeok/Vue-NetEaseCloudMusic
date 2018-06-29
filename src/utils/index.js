//文档高度
export  function getDocumentTop() {
  var scrollTop = 0, 
      bodyScrollTop = 0, 
      documentScrollTop = 0;
  if (document.body) {
      bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;    return scrollTop;
}
//可视窗口高度
export function getWindowHeight() {
  var windowHeight = 0;    
  if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
  } else {
      windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

//滚动条滚动高度
export function getScrollHeight() {
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;    return scrollHeight;
}

export function throttle (fn, delay) {
  var timer = null;
  return function () {
      clearTimeout(timer);
      timer = setTimeout(function() {
          fn();
      }, delay);
  }
};