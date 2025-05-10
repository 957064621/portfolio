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

  // 修改返回按钮处理逻辑
  const animatedButtons = document.querySelectorAll('.animated-button');
  console.log('找到返回按钮数量:', animatedButtons.length); // 调试信息
  
  animatedButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log('返回按钮被点击'); // 调试信息
      e.preventDefault();
      e.stopPropagation(); // 阻止事件冒泡
      
      // 如果历史记录中有内容则返回，否则跳转到首页
      setTimeout(() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'index.html';
        }
      }, 1000);
    });
  });
  
  // 为按钮的父元素a标签也添加事件处理
  const buttonLinks = document.querySelectorAll('a:has(.animated-button)');
  buttonLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('按钮链接被点击'); // 调试信息
      e.preventDefault();
      e.stopPropagation();
      
      setTimeout(() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'index.html';
        }
      }, 1000);
    });
  });

  // 按钮显示和滚动至顶部的代码
  // 假设第34行问题出现在这里，添加存在性检查
  const buttonTop = document.querySelector('.buttontop');
  if (buttonTop) {
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
  }

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
  // 禁用鼠标右键
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
      e.preventDefault();
    }
  });

  // 禁用选择功能
  document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
      e.preventDefault();
    }
  });

  // 增强图片保护 - 防止复制
  document.addEventListener('copy', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('img')) {
      e.preventDefault();
      return false;
    }
  });

  // 增强图片保护 - 防止拖拽（备用方案）
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
      e.preventDefault();
      return false;
    }
  });

  // 禁用键盘快捷键保存 (Ctrl+S / Command+S)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      return false;
    }
  });

  // 获取模态框、视频和关闭按钮元素
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('my-video');
  const closeBtn = document.querySelector('.close-video-btn');

  // 使用实际的按钮 ID
  // 假设第48行问题出现在这里，添加存在性检查
  const openVideoBtn = document.getElementById('open-video-btn'); 
  if (openVideoBtn) {
    // 打开模态框并播放视频
    openVideoBtn.addEventListener('click', () => {
      const modal = document.getElementById('video-modal');
      const video = document.getElementById('my-video');
      if (modal && video) {
        modal.style.display = 'flex';
        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
        video.play();
      }
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
}); // 添加闭合花括号以关闭事件监听器
