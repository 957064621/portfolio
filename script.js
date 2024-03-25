
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

$('.delayedLink').on('click', function(e) {
  e.preventDefault(); // 阻止链接的默认行为
  var url = $(this).attr('href'); // 获取链接的 href 值
  setTimeout(function() {
    window.location.href = url; // 在延迟后跳转到链接
  }, 1000); // 延迟时间，1000 毫秒等于1秒
});