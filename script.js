document.addEventListener('DOMContentLoaded', () => {
  // 开场加载动画 - 首张图片加载完 + 最短展示后淡出；站内返回首页时跳过全屏遮罩
  const loaderOverlay = document.getElementById('loader-overlay');
  const firstImage = document.querySelector('#content img');
  const isIndexPage = /(^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith('/');
  const cameFromInternalPage = (() => {
    try {
      if (!document.referrer || !isIndexPage) return false;
      const ref = new URL(document.referrer);
      return ref.origin === window.location.origin && ref.pathname !== window.location.pathname;
    } catch (_) {
      return false;
    }
  })();
  const skipIndexLoader = (() => {
    try {
      const shouldSkip = sessionStorage.getItem('skipIndexLoader') === '1';
      sessionStorage.removeItem('skipIndexLoader');
      return shouldSkip || cameFromInternalPage;
    } catch (_) {
      return cameFromInternalPage;
    }
  })();
  const MIN_LOADER_TIME = skipIndexLoader ? 0 : 1850;
  const startTime = Date.now();
  let loaderHidden = false;

  if (loaderOverlay && skipIndexLoader) {
    loaderOverlay.remove();
  }

  function hideLoaderOverlay() {
    if (loaderHidden) return;
    loaderHidden = true;

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);

    setTimeout(() => {
      loaderOverlay.classList.add('hidden');
      setTimeout(() => {
        if (loaderOverlay && loaderOverlay.parentNode) {
          loaderOverlay.parentNode.removeChild(loaderOverlay);
        }
      }, 900);
    }, remaining);
  }

  if (firstImage && loaderOverlay) {
    if (firstImage.complete) {
      hideLoaderOverlay();
    } else {
      firstImage.addEventListener('load', hideLoaderOverlay);
      firstImage.addEventListener('error', hideLoaderOverlay);
    }
  } else if (loaderOverlay) {
    hideLoaderOverlay();
  }

  // 回退：其他页面的旧加载动画
  const loadingAnimation = document.getElementById('loading-animation');
  if (loadingAnimation && !loaderOverlay) {
    if (firstImage) {
      if (firstImage.complete) {
        loadingAnimation.style.display = 'none';
      } else {
        firstImage.addEventListener('load', () => { loadingAnimation.style.display = 'none'; });
        firstImage.addEventListener('error', () => { loadingAnimation.style.display = 'none'; });
      }
    } else {
      loadingAnimation.style.display = 'none';
    }
  }

  // 修改返回按钮处理逻辑
  const animatedButtons = document.querySelectorAll('.animated-button');

  animatedButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // 阻止事件冒泡
      
      // 总是跳转到首页
      const link = button.closest('a');
      const targetUrl = link ? link.getAttribute('href') : 'index.html';

      try {
        if (/index\.html(?:$|[#?])/.test(targetUrl)) sessionStorage.setItem('skipIndexLoader', '1');
      } catch (_) {}

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1000);
    });
  });
  
  // 为按钮的父元素a标签也添加事件处理
  const buttonLinks = document.querySelectorAll('a:has(.animated-button)');
  buttonLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const targetUrl = link.getAttribute('href') || 'index.html';

      try {
        if (/index\.html(?:$|[#?])/.test(targetUrl)) sessionStorage.setItem('skipIndexLoader', '1');
      } catch (_) {}

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
  
  const hidePageTransitionOverlay = () => {
    overlay.classList.add('hidden');
  };

  // 强制重绘以确保过渡效果
  requestAnimationFrame(hidePageTransitionOverlay);

  window.addEventListener('pageshow', hidePageTransitionOverlay);

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
  const revealElements = document.querySelectorAll('#content > img, #content > .delayedLink, #content > .image-with-button, .image-wrapper > a');

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

  // --- Active Theory inspired: ambient cursor, scroll values, restrained card tilt ---
  const root = document.documentElement;
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  cursorOutline.className = 'cursor-outline';
  document.body.append(cursorDot, cursorOutline);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  const updatePointerVars = (x, y) => {
    mouseX = x;
    mouseY = y;
    root.style.setProperty('--mx', `${(x / window.innerWidth) * 100}%`);
    root.style.setProperty('--my', `${(y / window.innerHeight) * 100}%`);
    cursorDot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  window.addEventListener('pointermove', (e) => {
    updatePointerVars(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    root.style.setProperty('--scroll-progress', progress.toFixed(4));
  }, { passive: true });

  const animateCursor = () => {
    outlineX += (mouseX - outlineX) * 0.16;
    outlineY += (mouseY - outlineY) * 0.16;
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };
  updatePointerVars(mouseX, mouseY);
  animateCursor();

  // --- Index cinematic particle field: WebGL-like depth without breaking image layout ---
  if (isIndexPage) {
    const particleCanvas = document.createElement('canvas');
    particleCanvas.className = 'particle-field';
    particleCanvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(particleCanvas);

    const ctx = particleCanvas.getContext('2d', { alpha: true });
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resizeParticles() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      particleCanvas.width = Math.floor(width * dpr);
      particleCanvas.height = Math.floor(height * dpr);
      particleCanvas.style.width = `${width}px`;
      particleCanvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(96, Math.max(42, Math.floor(width * height / 24000)));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.28 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.09,
        vy: -0.045 - Math.random() * 0.09,
        size: 0.45 + Math.random() * 1.35,
        phase: Math.random() * Math.PI * 2,
        hue: i % 3
      }));
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const mx = mouseX || width / 2;
      const my = mouseY || height / 2;
      const scrollShift = (parseFloat(getComputedStyle(root).getPropertyValue('--scroll-progress')) || 0) * height * 0.18;

      particles.forEach((p, i) => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const influence = Math.max(0, 1 - dist / 260) * 0.46;
        p.x += p.vx * p.z + (dx / dist) * influence * 0.22;
        p.y += p.vy * p.z + Math.sin(Date.now() * 0.00058 + p.phase) * 0.026;

        if (p.y < -30) p.y = height + 30;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        const alpha = (0.045 + p.z * 0.038) * (1 - Math.min(0.55, scrollShift / Math.max(height, 1)));
        const radius = p.size * p.z;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 8);
        const color = '255,255,255';
        gradient.addColorStop(0, `rgba(${color},${alpha})`);
        gradient.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 8, 0, Math.PI * 2);
        ctx.fill();

        if (i % 11 === 0) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx + (p.x - mx) * 0.16, my + (p.y - my) * 0.16);
          ctx.stroke();
        }
      });
      requestAnimationFrame(drawParticles);
    }

    resizeParticles();
    window.addEventListener('resize', resizeParticles);
    drawParticles();
  }

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const interactiveElements = document.querySelectorAll('a, button, .image-container');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const tiltElements = document.querySelectorAll('.image-container');
    tiltElements.forEach(el => {
      el.classList.add('tilt-active');

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const spotX = (x / rect.width) * 100;
        const spotY = (y / rect.height) * 100;
        const rotateX = ((y / rect.height) - 0.5) * -4.5;
        const rotateY = ((x / rect.width) - 0.5) * 5.5;
        const tx = ((x / rect.width) - 0.5) * 5.5;
        const ty = ((y / rect.height) - 0.5) * 5.5;

        el.style.setProperty('--spot-x', `${spotX}%`);
        el.style.setProperty('--spot-y', `${spotY}%`);
        el.style.setProperty('--tilt-x', `${rotateX}deg`);
        el.style.setProperty('--tilt-y', `${rotateY}deg`);
        el.style.setProperty('--card-tx', `${tx}px`);
        el.style.setProperty('--card-ty', `${ty}px`);
        el.classList.add('is-tilting');
      });

      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--tilt-x', '0deg');
        el.style.setProperty('--tilt-y', '0deg');
        el.style.setProperty('--card-tx', '0px');
        el.style.setProperty('--card-ty', '0px');
        el.style.setProperty('--spot-x', '50%');
        el.style.setProperty('--spot-y', '50%');
        el.classList.remove('is-tilting');
      });
    });
  }

  // --- 浮动 UI 底色取样：多点采样 + 缓动，避免明暗切换生硬 ---
  const lumMap = {
    "1/1.png":211,"1/10.png":214,"1/11.png":219,"1/12.png":249,"1/13.png":19,"1/14.png":248,"1/15.png":107,"1/2.png":182,"1/3.png":224,"1/4.png":250,"1/5.png":142,"1/6.png":246,"1/7.png":248,"1/8.png":244,"1/9.png":242,"2/1.png":174,"2/10.png":243,"2/2.png":249,"2/3.png":244,"2/4.png":240,"2/5.png":243,"2/6.png":244,"2/7.png":246,"2/8.png":180,"2/9.png":239,"3/1.png":218,"3/2.png":234,"3/3.png":232,"3/4.png":225,"3/5.png":225,"4/1.png":149,"4/2.png":237,"4/3.png":240,"4/4.png":226,"4/5.png":244,"4/6.png":241,"4/7.png":200,"4/8.png":252,"5/1.png":143,"5/2.png":32,"5/3.png":111,"5/4.png":235,"5/5.png":166,"5/6.png":63,"5/7.png":21,"5/8.png":250,"6/2.png":76,"6/3.png":23,"6/4.png":35,"6/5.png":25,"6/6.png":27,"6/7.png":31,"Cover/01.png":18,"Cover/02.png":107,"Cover/03.png":88,"Cover/04.png":37,"Cover/05.png":38,"Cover/06.png":18,"Cover/07.png":107,"Cover/08.png":189,"Cover/09.png":38,"Cover/10.png":28,"iPhone%2014%20Pro%20Max%20-%205.png":219
  };
  const floatingControls = [...document.querySelectorAll('.ARbutton, .animated-button, .buttontop, .portfolio-video-button button.learn-more')];
  const floatingTextHost = document.querySelector('#container');
  const workWrappers = [...document.querySelectorAll('.image-wrapper')];
  const floatingTextTargets = [
    ...(floatingTextHost ? [
      {
        name: 'brand',
        host: floatingTextHost,
        prop: '--brand-tone',
        rect: () => ({ left: Math.max(18, window.innerWidth * 0.03), top: 18, width: Math.min(260, window.innerWidth * 0.36), height: 34 })
      },
      {
        name: 'scroll',
        host: floatingTextHost,
        prop: '--scroll-tone',
        rect: () => ({ left: window.innerWidth - Math.max(52, window.innerWidth * 0.04), top: window.innerHeight - 132, width: 34, height: 104 })
      }
    ] : []),
    ...workWrappers.map((wrapper, index) => ({
      name: `works-${index}`,
      host: wrapper,
      prop: '--works-tone',
      rect: () => {
        const r = wrapper.getBoundingClientRect();
        return { left: r.left + 16, top: r.top - 40, width: Math.min(260, r.width * 0.45), height: 28 };
      }
    }))
  ];
  const pageImages = [...document.querySelectorAll('#content img')].map(img => {
    let key = '';
    try { key = new URL(img.currentSrc || img.src).pathname.replace(/^\//, ''); } catch (_) {}
    return { img, key, lum: lumMap[key] ?? 80 };
  });

  function imageLumAtPoint(x, y) {
    for (const item of pageImages) {
      const r = item.img.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return item.lum;
    }
    return null;
  }

  function colorToLum(color) {
    const match = color && color.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const parts = match[1].split(',').map(part => Number.parseFloat(part.trim()));
    if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
    const alpha = parts.length >= 4 && !Number.isNaN(parts[3]) ? parts[3] : 1;
    if (alpha <= 0.05) return null;
    return parts[0] * 0.2126 + parts[1] * 0.7152 + parts[2] * 0.0722;
  }

  function elementLumAtPoint(x, y, ignoredHost = null) {
    const stack = document.elementsFromPoint(x, y);
    for (const stackEl of stack) {
      if (
        ignoredHost &&
        stackEl instanceof Element &&
        (stackEl === ignoredHost || ignoredHost.contains(stackEl) || stackEl.closest('.ARbutton, .animated-button, .buttontop, .portfolio-video-button'))
      ) {
        continue;
      }

      let el = stackEl;
      while (el && el !== document.documentElement) {
        if (
          ignoredHost &&
          el instanceof Element &&
          (el === ignoredHost || ignoredHost.contains(el) || el.closest('.ARbutton, .animated-button, .buttontop, .portfolio-video-button'))
        ) {
          break;
        }

        const lum = colorToLum(getComputedStyle(el).backgroundColor);
        if (lum !== null) return lum;
        el = el.parentElement;
      }
    }
    return null;
  }

  function sampleControlLuminance(control, rectOverride = null) {
    const rect = rectOverride || control.getBoundingClientRect();
    const xs = [0.18, 0.5, 0.82];
    const ys = [0.18, 0.5, 0.82];
    const points = xs.flatMap(px => ys.map(py => [
      rect.left + rect.width * px,
      rect.top + rect.height * py
    ]));

    const values = points
      .map(([x, y]) => imageLumAtPoint(x, y) ?? elementLumAtPoint(x, y, control))
      .filter(v => v !== null);

    // 没压在作品图上时，默认按暗色背景处理。
    if (!values.length) return 24;

    values.sort((a, b) => a - b);
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const high = values[Math.floor(values.length * 0.78)] ?? values[values.length - 1];
    const max = values[values.length - 1];

    // 亮底上的浅字最危险，所以局部有明显亮区时优先按亮底处理。
    return mean * 0.45 + high * 0.35 + max * 0.2;
  }

  function toneFromLum(lum) {
    const clamped = Math.max(0, Math.min(1, (lum - 88) / 104));
    if (lum >= 136) return Math.max(clamped, 0.84);
    if (lum <= 68) return Math.min(clamped, 0.08);
    return clamped;
  }

  const controlToneState = new WeakMap();
  const textToneState = new Map();

  function applyTone(target, nextTone) {
    target.style.setProperty('--surface-tone', nextTone.toFixed(4));

    // 对应关系：底部越亮，按钮越深；底部越暗，按钮越浅。文字始终反向，保证可读性。
    const mix = (a, b) => Math.round(a + (b - a) * nextTone);
    const fg = `rgba(${mix(8, 255)}, ${mix(10, 250)}, ${mix(12, 240)}, 0.98)`;
    const bgAlpha = (0.38 + 0.34 * nextTone).toFixed(3);
    const bg = `rgba(${mix(255, 6)}, ${mix(255, 7)}, ${mix(255, 9)}, ${bgAlpha})`;
    const border = nextTone > 0.58
      ? `rgba(255, 255, 255, ${(0.22 + 0.1 * nextTone).toFixed(3)})`
      : `rgba(255, 255, 255, ${(0.28 + 0.16 * (1 - nextTone)).toFixed(3)})`;
    const topGlint = `rgba(255, 255, 255, ${(0.46 - 0.2 * nextTone).toFixed(3)})`;
    const midGlint = `rgba(255, 255, 255, ${(0.2 - 0.1 * nextTone).toFixed(3)})`;
    const lowGlint = `rgba(255, 255, 255, ${(0.09 - 0.04 * nextTone).toFixed(3)})`;
    const shadow = `rgba(0, 0, 0, ${(0.18 + 0.34 * nextTone).toFixed(3)})`;
    target.style.setProperty('--control-fg', fg);
    target.style.setProperty('--control-bg', bg);
    target.style.setProperty('--control-border', border);
    target.style.setProperty('--control-glint-top', topGlint);
    target.style.setProperty('--control-glint-mid', midGlint);
    target.style.setProperty('--control-glint-low', lowGlint);
    target.style.setProperty('--control-shadow', shadow);
  }

  function animateFloatingTone() {
    floatingControls.forEach(control => {
      const targetLum = sampleControlLuminance(control);
      const targetTone = toneFromLum(targetLum);
      const currentTone = controlToneState.has(control) ? controlToneState.get(control) : targetTone;
      const nextTone = currentTone + (targetTone - currentTone) * 0.12;
      controlToneState.set(control, nextTone);
      applyTone(control, nextTone);

      // 类名只作为旧浏览器 fallback，加入滞后阈值避免来回闪。
      const isLightNow = control.classList.contains('on-light-surface');
      if (!isLightNow && nextTone > 0.62) {
        control.classList.add('on-light-surface');
        control.classList.remove('on-dark-surface');
      } else if (isLightNow && nextTone < 0.42) {
        control.classList.remove('on-light-surface');
        control.classList.add('on-dark-surface');
      } else if (!control.classList.contains('on-light-surface') && !control.classList.contains('on-dark-surface')) {
        control.classList.add(nextTone > 0.52 ? 'on-light-surface' : 'on-dark-surface');
      }
    });

    floatingTextTargets.forEach(target => {
      const targetLum = sampleControlLuminance(target.host, target.rect());
      const targetTone = toneFromLum(targetLum);
      const currentTone = textToneState.has(target.name) ? textToneState.get(target.name) : targetTone;
      const nextTone = currentTone + (targetTone - currentTone) * 0.12;
      textToneState.set(target.name, nextTone);
      target.host.style.setProperty(target.prop, nextTone.toFixed(4));
    });

    requestAnimationFrame(animateFloatingTone);
  }
  animateFloatingTone();

  // --- 灵动磁吸：只更新变量，不覆盖 CSS transition ---
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const magneticButtons = [...document.querySelectorAll('.ARbutton, .portfolio-video-button button.learn-more, .animated-button, .buttontop')];

    magneticButtons.forEach(btn => {
      let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
      let active = false;

      const renderMagnet = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        btn.style.setProperty('--mag-x', `${currentX.toFixed(2)}px`);
        btn.style.setProperty('--mag-y', `${currentY.toFixed(2)}px`);

        if (active || Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
          requestAnimationFrame(renderMagnet);
        }
      };

      btn.addEventListener('mouseenter', () => {
        active = true;
        btn.classList.add('is-magnetic');
        requestAnimationFrame(renderMagnet);
      });

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const strength = btn.classList.contains('buttontop') || btn.classList.contains('animated-button') ? 0.1 : 0.12;
        const spotX = ((e.clientX - rect.left) / rect.width) * 100;
        const spotY = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--btn-spot-x', `${spotX}%`);
        btn.style.setProperty('--btn-spot-y', `${spotY}%`);
        targetX = Math.max(-10, Math.min(10, x * strength));
        targetY = Math.max(-8, Math.min(8, y * strength));
      });

      btn.addEventListener('mouseleave', () => {
        active = false;
        targetX = 0;
        targetY = 0;
        btn.style.setProperty('--btn-spot-x', '22%');
        btn.style.setProperty('--btn-spot-y', '18%');
        btn.classList.remove('is-magnetic');
        requestAnimationFrame(renderMagnet);
      });
    });
  }

}); // 添加闭合花括号以关闭事件监听器
