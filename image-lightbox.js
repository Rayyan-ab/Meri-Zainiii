/* Site-wide image viewer. Adds behavior only; existing page markup and images stay unchanged. */
(() => {
  if (window.__meriImageLightboxReady) return;
  window.__meriImageLightboxReady = true;

  const style = document.createElement('style');
  style.textContent = `
    .meri-lightbox { position: fixed; inset: 0; z-index: 2147483000; display: none; align-items: center; justify-content: center; padding: 56px 72px; background: rgba(0,0,0,.94); box-sizing: border-box; }
    .meri-lightbox.is-open { display: flex; }
    .meri-lightbox-image { display: block; max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
    .meri-lightbox-close, .meri-lightbox-arrow { position: absolute; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.28); color: #fff; background: rgba(20,12,18,.72); cursor: pointer; border-radius: 50%; line-height: 1; z-index: 1; -webkit-tap-highlight-color: transparent; }
    .meri-lightbox-close { top: 16px; right: 18px; width: 46px; height: 46px; font: 32px/1 Arial,sans-serif; }
    .meri-lightbox-arrow { top: 50%; transform: translateY(-50%); width: 48px; height: 48px; font: 32px/1 Arial,sans-serif; }
    .meri-lightbox-prev { left: 14px; } .meri-lightbox-next { right: 14px; }
    .meri-lightbox-count { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,.82); font: 12px/1.4 Arial,sans-serif; letter-spacing: .08em; }
    .meri-lightbox button:focus-visible { outline: 2px solid #d8bd91; outline-offset: 3px; }
    body img { cursor: zoom-in; }
    @media (max-width: 600px) { .meri-lightbox { padding: 58px 12px; } .meri-lightbox-close { top: 10px; right: 10px; width: 42px; height: 42px; } .meri-lightbox-arrow { width: 40px; height: 40px; font-size: 27px; } .meri-lightbox-prev { left: 7px; } .meri-lightbox-next { right: 7px; } .meri-lightbox-count { bottom: 10px; } }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'meri-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Full-size image viewer');
  overlay.innerHTML = `
    <button class="meri-lightbox-close" type="button" aria-label="Close image">×</button>
    <button class="meri-lightbox-arrow meri-lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <img class="meri-lightbox-image" alt="">
    <button class="meri-lightbox-arrow meri-lightbox-next" type="button" aria-label="Next image">›</button>
    <div class="meri-lightbox-count" aria-live="polite"></div>`;
  document.body.appendChild(overlay);

  const viewerImage = overlay.querySelector('.meri-lightbox-image');
  const count = overlay.querySelector('.meri-lightbox-count');
  const closeButton = overlay.querySelector('.meri-lightbox-close');
  const previousButton = overlay.querySelector('.meri-lightbox-prev');
  const nextButton = overlay.querySelector('.meri-lightbox-next');
  let images = [];
  let activeIndex = 0;
  let previousFocus = null;
  let previousBodyOverflow = '';

  function collectImages() {
    return Array.from(document.querySelectorAll('img'))
      .filter(img => img.isConnected && !overlay.contains(img) && (img.currentSrc || img.getAttribute('src') || img.getAttribute('data-src')));
  }
  function imageSource(img) {
    return img.getAttribute('data-full-src') || img.getAttribute('data-original') || img.currentSrc || img.getAttribute('src') || img.getAttribute('data-src');
  }
  function show(index) {
    if (!images.length) return;
    activeIndex = (index + images.length) % images.length;
    const img = images[activeIndex];
    viewerImage.src = imageSource(img);
    viewerImage.alt = img.alt || 'Full-size image';
    count.textContent = `${activeIndex + 1} / ${images.length}`;
    const multiple = images.length > 1;
    previousButton.hidden = !multiple;
    nextButton.hidden = !multiple;
  }
  function open(img) {
    images = collectImages();
    activeIndex = images.indexOf(img);
    if (activeIndex < 0) return;
    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    show(activeIndex);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeButton.focus({ preventScroll: true });
  }
  function close() {
    if (!overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = previousBodyOverflow;
    viewerImage.removeAttribute('src');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', event => {
    const img = event.target && event.target.closest ? event.target.closest('img') : null;
    if (!img || overlay.contains(img)) return;
    // Clicking a picture inside a chapter tile/card opens the picture, not its parent link/card.
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    open(img);
  }, true);
  closeButton.addEventListener('click', close);
  previousButton.addEventListener('click', () => show(activeIndex - 1));
  nextButton.addEventListener('click', () => show(activeIndex + 1));
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key === 'ArrowLeft' && images.length > 1) { event.preventDefault(); show(activeIndex - 1); }
    else if (event.key === 'ArrowRight' && images.length > 1) { event.preventDefault(); show(activeIndex + 1); }
  });
})();
