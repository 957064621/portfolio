
document.addEventListener('DOMContentLoaded', () => {
  const image = document.getElementById('3_1');
  const loadingAnimation = document.getElementById('loading-animation');

  // 检查图片是否已经加载完成
  if (image.complete) {
    loadingAnimation.style.display = 'none'; // 隐藏加载动画
    image.style.visibility = 'visible'; // 显示图片
  } else {
    // 图片加载成功事件
    image.addEventListener('load', () => {
      loadingAnimation.style.display = 'none'; // 隐藏加载动画
      image.style.visibility = 'visible'; // 显示图片
    });

    // 图片加载失败事件
    image.addEventListener('error', () => {
      loadingAnimation.style.display = 'none'; // 隐藏加载动画
      // 可以在这里添加加载失败时的处理逻辑
    });
  }
});

// 监听点击事件
document.addEventListener('DOMContentLoaded', function() {
  // 监听点击事件
  document.addEventListener('click', function(e) {
    // 使用 closest 方法查找最近的具有 'delayedLink' 类的祖先元素
    var delayedLink = e.target.closest('.delayedLink');
    if (delayedLink) {
      e.preventDefault(); // 阻止链接的默认行为
      var url = delayedLink.getAttribute('href'); // 获取链接的 href 值
      setTimeout(function() {
        window.location.href = url; // 在延迟后跳转到链接
      }, 1000); // 延迟时间，1000 毫秒等于1秒
    }
  });
});

// 获取按钮元素
var myButton = document.querySelector('.buttontop');

// 当用户滚动页面时执行函数
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    // 当页面向下滚动超过100px时，显示按钮并添加 'show' 类
    myButton.classList.add('show');
  } else {
    // 否则隐藏按钮并移除 'show' 类
    myButton.classList.remove('show');
  }
};

// 当用户点击按钮时执行函数
myButton.onclick = function() {
  // 滚动到页面顶部
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};