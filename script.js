document.addEventListener('DOMContentLoaded', () => {
  const image = document.getElementById('1_1');
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

// 监听 DOMContentLoaded 事件
document.addEventListener('DOMContentLoaded', function() {


  // 监听点击事件
  document.addEventListener('click', function(e) {
    // 查找最近的具有 'delayedLink' 类的祖先元素
    var delayedLink = e.target.closest('.delayedLink');
    if (delayedLink) {
      e.preventDefault(); // 阻止链接的默认行为
      var url = delayedLink.getAttribute('href'); // 获取链接的 href 值
      setTimeout(function() {
        window.location.href = url; // 在延迟后跳转到链接
      }, 1000); // 延迟时间，1000 毫秒等于1秒
    }

    // 查找最近的具有 'animated-button' 类的祖先元素
    var animatedButton = e.target.closest('.animated-button');
    if (animatedButton) {
      e.preventDefault(); // 阻止按钮的默认行为
      setTimeout(function() {
        window.history.back(); // 在延迟后执行返回操作
      }, 1000); // 延迟时间，1000 毫秒等于1秒
    }
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const buttonTop = document.querySelector('.buttontop');
  
  // 检测滚动位置并切换按钮的显示状态
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      buttonTop.classList.add('show');
      buttonTop.classList.remove('hidden');
    } else {
      buttonTop.classList.remove('show');
      buttonTop.classList.add('hidden');
    }
  });

  // 定义一个函数来处理滚动至顶部的行为和恢复按钮状态
  const scrollToTopAndHideButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 设置延时以恢复按钮的初始状态
    setTimeout(() => {
      buttonTop.classList.remove('show');
      buttonTop.classList.add('hidden');
    }, 600); // 600ms后执行
  };

  // 监听点击事件
  buttonTop.addEventListener('click', scrollToTopAndHideButton);

  // 监听触摸结束事件
  buttonTop.addEventListener('touchend', (event) => {
    // 防止默认行为和立即触发的点击事件
    event.preventDefault();
    
    // 延迟一段时间后执行滚动至顶部和恢复按钮状态的函数
    setTimeout(scrollToTopAndHideButton, 1000);
  });
});