document.addEventListener('DOMContentLoaded', () => {
  // 图片加载相关的代码
  const image = document.getElementById('1_1');
  const loadingAnimation = document.getElementById('loading-animation');
  if (image.complete) {
    loadingAnimation.style.display = 'none';
    image.style.visibility = 'visible';
  } else {
    image.addEventListener('load', () => {
      loadingAnimation.style.display = 'none';
      image.style.visibility = 'visible';
    });
    image.addEventListener('error', () => {
      loadingAnimation.style.display = 'none';
      // 添加加载失败时的处理逻辑
    });
  }

  const animatedButtons = document.querySelectorAll('.animated-button');
  animatedButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      setTimeout(() => {
        window.history.back();
      }, 1000); // 延迟1秒后执行返回操作
    });
  });

  // 按钮显示和滚动至顶部的代码
  const buttonTop = document.querySelector('.buttontop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      buttonTop.classList.add('show');
      buttonTop.classList.remove('hidden');
    } else {
      buttonTop.classList.remove('show');
      buttonTop.classList.add('hidden');
    }
  });
  const scrollToTopAndHideButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      buttonTop.classList.remove('show');
      buttonTop.classList.add('hidden');
    }, 600);
  };
  buttonTop.addEventListener('click', scrollToTopAndHideButton);
  buttonTop.addEventListener('touchend', (event) => {
    event.preventDefault();
    setTimeout(scrollToTopAndHideButton, 1000);
  });

// 延迟链接的代码
// document.addEventListener('click', (e) => {
//   const delayedLink = e.target.closest('.delayedLink');
//   if (delayedLink) {
//     e.preventDefault(); // 阻止链接的默认行为
//     e.stopPropagation(); // 阻止事件冒泡
//     const url = delayedLink.getAttribute('href');
//     setTimeout(() => {
//       window.location.href = url;
//     }, 1000); // 延迟1秒后跳转
//   }
// });
});
