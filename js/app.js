(function () {
  const I18N = {
    en: {
      'nav.skip': 'Skip to content',
      'nav.home': 'Home',
      'nav.sizes': 'Sizes',
      'nav.pricing': 'Pricing',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.order': 'Order Online',
      'nav.menu': 'Menu',
      'nav.close': 'Close',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'form.name': 'Name',
      'form.email': 'Email',
      'form.help': 'How can we help?',
      'form.send': 'Send',
      'form.fullname': 'Full name',
      'form.address': 'Delivery address',
      'form.city': 'City',
      'form.zip': 'ZIP',
      'form.card': 'Card number (mock)',
      'form.expiry': 'MM/YY',
      'form.cvc': 'CVC',
      'form.pay': 'Submit Payment',
      'success.back': 'Back home',
      'study.disclaimer': 'This site is an independent design study. It is not affiliated with, endorsed by, or operated by Budget Dumpster. Copy and color values are used for study only. Mock checkout does not process real payments. Chrome can install this PWA from the address bar.',
      'study.short': 'Independent design study — not affiliated with Budget Dumpster.',
      'study.mock': 'Mock cart. Independent design study, not affiliated.',
      'study.checkout': 'Mock checkout — no payment is processed. This is an independent design study.',
      'study.success': 'This was a mock checkout for an independent design study. No payment was processed and no dumpster will be delivered.'
    },
    pt: {
      'nav.skip': 'Saltar para o conteúdo',
      'nav.home': 'Início',
      'nav.sizes': 'Tamanhos',
      'nav.pricing': 'Preços',
      'nav.services': 'Serviços',
      'nav.about': 'Sobre',
      'nav.contact': 'Contacto',
      'nav.order': 'Encomendar',
      'nav.menu': 'Menu',
      'nav.close': 'Fechar',
      'theme.light': 'Claro',
      'theme.dark': 'Escuro',
      'form.name': 'Nome',
      'form.email': 'Email',
      'form.help': 'Como podemos ajudar?',
      'form.send': 'Enviar',
      'form.fullname': 'Nome completo',
      'form.address': 'Morada de entrega',
      'form.city': 'Cidade',
      'form.zip': 'Código postal',
      'form.card': 'Número do cartão (simulado)',
      'form.expiry': 'MM/AA',
      'form.cvc': 'CVC',
      'form.pay': 'Enviar pagamento',
      'success.back': 'Voltar',
      'study.disclaimer': 'Este site é um estudo de design independente. Não é afiliado, endossado ou operado pela Budget Dumpster. Textos e cores oficiais são usados apenas para estudo. O checkout simulado não processa pagamentos reais. O Chrome pode instalar este PWA a partir da barra de endereço.',
      'study.short': 'Estudo de design independente — sem vínculo com a Budget Dumpster.',
      'study.mock': 'Carrinho simulado. Estudo de design independente, sem vínculo.',
      'study.checkout': 'Checkout simulado — nenhum pagamento é processado. Este é um estudo de design independente.',
      'study.success': 'Este foi um checkout simulado para um estudo de design independente. Nenhum pagamento foi processado e nenhum contentor será entregue.'
    }
  };

  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'pt' ? 'pt' : 'en';
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
    const menu = document.querySelector('.menu-btn');
    if (menu) {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.textContent = dict[open ? 'nav.close' : 'nav.menu'];
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-set-theme]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-theme') === theme ? 'true' : 'false');
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e0c08' : '#111111');
  }

  applyTheme(currentTheme());
  applyI18n(currentLang());

  document.addEventListener('click', function (e) {
    const langBtn = e.target.closest('[data-set-lang]');
    if (langBtn) {
      const lang = langBtn.getAttribute('data-set-lang') === 'pt' ? 'pt' : 'en';
      document.documentElement.setAttribute('lang', lang);
      try { localStorage.setItem('bd-lang', lang); } catch (err) {}
      applyI18n(lang);
    }
    const themeBtn = e.target.closest('[data-set-theme]');
    if (themeBtn) {
      const theme = themeBtn.getAttribute('data-set-theme') === 'dark' ? 'dark' : 'light';
      try { localStorage.setItem('bd-theme', theme); } catch (err) {}
      applyTheme(theme);
    }
  });

  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    function setMenu(open) {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      navLinks.classList.toggle('is-open', open);
      applyI18n(currentLang());
    }
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  const bg = document.getElementById('heroBg');
  if (bg) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hero = bg.closest('.hero') || bg;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let tabVisible = document.visibilityState === 'visible';
    let onscreen = true;
    let lastTransform = '';
    let listening = false;

    function motionAllowed() {
      return !reduceMotion.matches && tabVisible && onscreen;
    }

    function apply(px, py) {
      const next = 'scale(1.08) translate3d(' + px + 'px, ' + py + 'px, 0)';
      if (next === lastTransform) return;
      lastTransform = next;
      bg.style.transform = next;
    }

    function stopLoop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      bg.style.willChange = '';
    }

    function tick() {
      raf = 0;
      if (!motionAllowed()) {
        stopLoop();
        return;
      }

      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;

      const px = Math.round(x * 100) / 100;
      const py = Math.round(y * 100) / 100;
      apply(px, py);

      if (Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05) {
        x = tx;
        y = ty;
        apply(Math.round(x * 100) / 100, Math.round(y * 100) / 100);
        stopLoop();
        return;
      }

      raf = requestAnimationFrame(tick);
    }

    function kick() {
      if (!motionAllowed() || raf) return;
      bg.style.willChange = 'transform';
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      if (!motionAllowed()) return;
      tx = ((e.clientX - cx) / cx) * 20;
      ty = ((e.clientY - cy) / cy) * 20;
      kick();
    }

    function onResize() {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    }

    function onVisibility() {
      tabVisible = document.visibilityState === 'visible';
      if (!tabVisible) stopLoop();
    }

    function bindMove() {
      if (listening || !motionAllowed()) return;
      window.addEventListener('mousemove', onMove, { passive: true });
      listening = true;
    }

    function unbindMove() {
      if (!listening) return;
      window.removeEventListener('mousemove', onMove);
      listening = false;
    }

    function syncMotionPreference() {
      if (reduceMotion.matches) {
        unbindMove();
        stopLoop();
        tx = 0;
        ty = 0;
        x = 0;
        y = 0;
        apply(0, 0);
        return;
      }
      bindMove();
    }

    function onMq(mq, fn) {
      if (mq.addEventListener) mq.addEventListener('change', fn);
      else mq.addListener(fn);
    }

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    onMq(reduceMotion, syncMotionPreference);

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        onscreen = entries.some(function (entry) { return entry.isIntersecting; });
        if (!onscreen) stopLoop();
      }, { threshold: 0 });
      io.observe(hero);
    }

    syncMotionPreference();
  }

  const BASE = {10:399,15:449,20:529,30:699,40:849};
  const DAYS_ADD = {7:0,10:25,14:60};

  function calcTotal(size, days, extraWeight, permit){
    let t = BASE[size] || 529;
    t += DAYS_ADD[days] || 0;
    if(extraWeight) t += 75;
    if(permit) t += 50;
    return t;
  }
  function agency(size){ return 800 + (BASE[size]||529); }
  function freelancer(size){ return Math.round((BASE[size]||529)*1.35); }

  function bindCalc(){
    const root = document.getElementById('calculator-section');
    if(!root) return;
    const state = {size:20, days:7, extra:false, permit:false};
    const set = function () {
      root.querySelectorAll('[data-size]').forEach(function(el){el.classList.toggle('on', +el.dataset.size===state.size);});
      root.querySelectorAll('[data-days]').forEach(function(el){el.classList.toggle('on', +el.dataset.days===state.days);});
      root.querySelectorAll('[data-extra]').forEach(function(el){el.classList.toggle('on', state.extra);});
      root.querySelectorAll('[data-permit]').forEach(function(el){el.classList.toggle('on', state.permit);});
      const you = calcTotal(state.size,state.days,state.extra,state.permit);
      root.querySelector('#you-price').textContent = '$'+you.toLocaleString();
      root.querySelector('#ag-price').textContent = '$'+agency(state.size).toLocaleString();
      root.querySelector('#fr-price').textContent = '$'+freelancer(state.size).toLocaleString();
      root.querySelector('#size-val').textContent = state.size;
      sessionStorage.setItem('bd-quote', JSON.stringify(Object.assign({}, state, {you: you})));
    };
    root.querySelectorAll('[data-size]').forEach(function(el){el.onclick=function(){state.size=+el.dataset.size;set();};});
    root.querySelectorAll('[data-days]').forEach(function(el){el.onclick=function(){state.days=+el.dataset.days;set();};});
    root.querySelectorAll('[data-extra]').forEach(function(el){el.onclick=function(){state.extra=!state.extra;set();};});
    root.querySelectorAll('[data-permit]').forEach(function(el){el.onclick=function(){state.permit=!state.permit;set();};});
    set();
  }

  window.addToCart = function(size){
    const days = 7;
    const you = calcTotal(size,days,false,false);
    sessionStorage.setItem('bd-cart', JSON.stringify({size:size, days:days, extra:false, permit:false, you:you}));
    location.href = '/cart';
  };

  function renderCart(){
    const el = document.getElementById('cart-body');
    if(!el) return;
    const cart = JSON.parse(sessionStorage.getItem('bd-cart')||sessionStorage.getItem('bd-quote')||'null');
    if(!cart){ el.innerHTML = '<p>Your cart is empty. <a href="/sizes">View dumpster sizes</a>.</p>'; return; }
    el.innerHTML = '<div class="card liquid-glass"><h3>'+cart.size+' Yard Dumpster</h3>'+
      '<p class="muted">'+cart.days+'-day rental period. Flat-rate pricing.</p>'+
      '<p><b>$'+cart.you.toLocaleString()+'</b></p>'+
      '<div class="row"><a class="cta" href="/checkout">Continue to checkout</a>'+
      '<a class="btn-dark" href="/sizes">Change size</a></div></div>';
  }

  window.submitCheckout = function(e){
    e.preventDefault();
    sessionStorage.setItem('bd-order','ok');
    location.href='/success';
  };

  bindCalc();
  renderCart();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }
})();
