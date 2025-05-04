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
      // 添加具体的加载失败处理逻辑
      console.error('图片加载失败');
    });
  }

  const animatedButtons = document.querySelectorAll('.animated-button');
  animatedButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      setTimeout(() => {
        window.history.back();
      }, 1000); 
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
  //     e.preventDefault(); 
  //     e.stopPropagation(); 
  //     const url = delayedLink.getAttribute('href');
  //     setTimeout(() => {
  //       window.location.href = url;
  //     }, 1000); 
  //   }
  // });
});



  // 获取模态框、视频和关闭按钮元素
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('my-video');
  const closeBtn = document.querySelector('.close-video-btn');

  // 使用实际的按钮 ID
  const openVideoBtn = document.getElementById('open-video-btn'); 

  // 打开模态框并播放视频
  if (openVideoBtn) {
      openVideoBtn.addEventListener('click', () => {
          modal.style.display = 'flex';
          setTimeout(() => {
              modal.classList.add('show');
          }, 10);
          video.play();
      });
  }

  // 关闭模态框并暂停视频
  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          modal.classList.remove('show');
          video.pause();
          video.currentTime = 0; // 重置视频播放位置
          setTimeout(() => {
              modal.style.display = 'none';
          }, 500);
      });
  }

  // 点击模态框背景也可以关闭模态框
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.classList.remove('show');
          video.pause();
          video.currentTime = 0;
          setTimeout(() => {
              modal.style.display = 'none';
          }, 500);
      }
  });
