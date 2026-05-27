document.addEventListener('DOMContentLoaded', () => {
  // 图片加载相关的代码
  const image = document.getElementById('1_1');
  const loadingAnimation = document.getElementById('loading-animation');
  
  if (image && loadingAnimation) {
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
  }

  // 修改返回按钮处理逻辑
  const animatedButtons = document.querySelectorAll('.animated-button');
  console.log('找到返回按钮数量:', animatedButtons.length); // 调试信息
  
  animatedButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log('返回按钮被点击'); // 调试信息
      e.preventDefault();
      e.stopPropagation(); // 阻止事件冒泡
      
      // 总是跳转到首页
      const link = button.closest('a');
      const targetUrl = link ? link.getAttribute('href') : 'index.html';
      
      setTimeout(() => {
        window.location.href = targetUrl;
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
      
      const targetUrl = link.getAttribute('href') || 'index.html';
      
      setTimeout(() => {
        window.location.href = targetUrl;
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

  // --- 新增：页面加载过渡 ---
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
  }
  
  // 强制重绘以确保过渡效果
  requestAnimationFrame(() => {
    overlay.classList.add('hidden');
  });

  // 拦截点击链接进行过渡动画
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      const onclick = link.getAttribute('onclick');
      
      // 如果是普通链接且没有 target="_blank"
      if (href && !href.startsWith('#') && !href.startsWith('javascript:') && link.target !== '_blank') {
        e.preventDefault();
        overlay.classList.remove('hidden');
        setTimeout(() => {
          window.location.href = href;
        }, 600); // 等待遮罩显示
      } 
      // 如果是带有 inline onclick 的 javascript:void(0) 链接
      else if (href === 'javascript:void(0);' && onclick && onclick.includes('location.href')) {
        overlay.classList.remove('hidden');
      }
    }
  });

  // --- 新增：滚动显现动画 (Intersection Observer) ---
  const revealElements = document.querySelectorAll('#content img, .image-container, .delayedLink, .image-with-button');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01, // 降低阈值，确保更容易触发
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
    // 强制检查：如果元素已经在视口中（例如页面顶部的大图），确保它显示
    setTimeout(() => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    }, 100);
  });

  // --- 新增：物理感倾斜效果 (Tilt Effect) ---
  // 只对非移动端设备启用，避免触摸冲突
  if (window.matchMedia("(min-width: 768px)").matches) {
    const tiltElements = document.querySelectorAll('.image-container, #content img.responsive');
    
    tiltElements.forEach(el => {
      el.classList.add('tilt-active');
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // 计算旋转角度
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'transform 0.1s ease-out';
        el.style.zIndex = '10';
        el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s ease-out';
        el.style.zIndex = '1';
        el.style.boxShadow = 'none';
      });
    });
  }

  // --- 新增：磁性按钮效果 (Magnetic Buttons) ---
  if (window.matchMedia("(min-width: 768px)").matches) {
    const magneticButtons = document.querySelectorAll('.animated-button, .ARbutton, .learn-more, .buttontop');
    
    magneticButtons.forEach(btn => {
      // 初始化自定义属性用于存储当前的磁力偏移
      btn.dataset.tx = 0;
      btn.dataset.ty = 0;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        
        // 读取当前的磁力偏移
        const currentTx = parseFloat(btn.dataset.tx) || 0;
        const currentTy = parseFloat(btn.dataset.ty) || 0;
        
        // 计算元素的原始中心点（去除磁力偏移的影响）
        // 注意：rect.left 包含了 currentTx
        const centerX = rect.left - currentTx + rect.width / 2;
        const centerY = rect.top - currentTy + rect.height / 2;
        
        // 计算鼠标相对于原始中心点的偏移
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        
        const strength = 0.3;
        const newTx = x * strength;
        const newTy = y * strength;
        
        // 更新存储的偏移量
        btn.dataset.tx = newTx;
        btn.dataset.ty = newTy;
        
        // 应用变换
        if (btn.classList.contains('ARbutton') || btn.classList.contains('learn-more')) {
           btn.style.transform = `translateX(calc(-50% + ${newTx}px)) translateY(${newTy}px)`;
        } else {
           btn.style.transform = `translate(${newTx}px, ${newTy}px)`;
        }
        btn.style.transition = 'transform 0.1s ease-out';
      });
      
      btn.addEventListener('mouseleave', () => {
        // 重置
        btn.dataset.tx = 0;
        btn.dataset.ty = 0;
        
        if (btn.classList.contains('ARbutton') || btn.classList.contains('learn-more')) {
           btn.style.transform = 'translateX(-50%)';
        } else {
           btn.style.transform = 'translate(0, 0)';
        }
        btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      });
    });
  }

}); // 添加闭合花括号以关闭事件监听器
