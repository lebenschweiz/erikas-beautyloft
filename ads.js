// Google-Tag mit Cookie-Einwilligung (Google Consent Mode v2, «Basic»).
// Google Ads: misst, ob jemand nach einem Anzeigenklick Kontakt aufnimmt
// (WhatsApp, Telefon oder Kontaktformular). Konto «erika's», Google-Tag AW-11349567712.
// Google Analytics 4: Property «erika», Mess-ID G-QXTBLXY6K0 (Website-Besuche).
// Google wird erst geladen, wenn die Besucherin im Cookie-Hinweis «Akzeptieren» wählt.
// Die Wahl wird im Browser gespeichert (localStorage «cookie-consent», 12 Monate);
// über «Cookie-Einstellungen» im Seitenfuss kann sie jederzeit geändert werden.
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('js', new Date());
gtag('config', 'AW-11349567712');
gtag('config', 'G-QXTBLXY6K0');

(() => {
  const KEY = 'cookie-consent';
  const MAX_AGE = 365 * 24 * 3600 * 1000;
  const TEXT = {
    de: {
      msg: 'Wir verwenden Cookies von Google Analytics und Google Ads, um zu verstehen, wie unsere Website genutzt wird, und um unsere Werbung zu messen. Sie entscheiden, ob Sie zustimmen.',
      more: 'Mehr in der Datenschutzerklärung', yes: 'Akzeptieren', no: 'Ablehnen',
      settings: 'Cookie-Einstellungen', aria: 'Cookie-Hinweis'
    },
    en: {
      msg: 'We use cookies from Google Analytics and Google Ads to understand how our website is used and to measure our advertising. You decide whether you agree.',
      more: 'More in the privacy policy', yes: 'Accept', no: 'Decline',
      settings: 'Cookie settings', aria: 'Cookie notice'
    },
    ru: {
      msg: 'Мы используем файлы cookie Google Analytics и Google Ads, чтобы понимать, как используется наш сайт, и оценивать эффективность рекламы. Вы сами решаете, согласиться ли.',
      more: 'Подробнее в политике конфиденциальности', yes: 'Принять', no: 'Отклонить',
      settings: 'Настройки cookie', aria: 'Уведомление о cookie'
    }
  };
  const lang = (document.documentElement.lang || 'de').slice(0, 2);
  const t = TEXT[lang] || TEXT.de;
  // Die 404-Seite bindet ads.js mit absolutem Pfad ein und braucht daher einen absoluten Link
  const privacyHref = document.querySelector('script[src^="/ads.js"]') ? '/datenschutz.html' : 'datenschutz.html';

  const read = () => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (v && (v.c === 'yes' || v.c === 'no') && Date.now() - v.t < MAX_AGE) return v.c;
    } catch (e) { /* kein Speicher verfügbar */ }
    return null;
  };
  const save = c => {
    try { localStorage.setItem(KEY, JSON.stringify({ c, t: Date.now() })); } catch (e) { /* ignorieren */ }
  };

  let loaded = false;
  const grant = () => {
    gtag('consent', 'update', {
      ad_storage: 'granted', ad_user_data: 'granted',
      ad_personalization: 'denied', // personalisierte Werbung bleibt aus
      analytics_storage: 'granted'
    });
    gtag('set', 'ads_data_redaction', false);
    if (loaded) return;
    loaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-QXTBLXY6K0';
    document.head.appendChild(s);
  };

  // Conversions werden nur gesendet, wenn zugestimmt wurde (sonst bleibt Google ungeladen)
  const labels = {
    whatsapp: 'AW-11349567712/Mwr1CNaAoLUdEODR8qMq', // WhatsApp-Klick (Website)
    telefon: 'AW-11349567712/ZG3UCNmAoLUdEODR8qMq',  // Telefon-Klick (Website)
    formular: 'AW-11349567712/ttfMCNyAoLUdEODR8qMq'  // Kontaktformular gesendet (Website)
  };
  window.adsConversion = art => {
    if (loaded && labels[art]) gtag('event', 'conversion', { send_to: labels[art], transport_type: 'beacon' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('https://wa.me/')) {
      // «Jetzt buchen»-Links öffnen zuerst das Auswahlfenster; gezählt wird erst «Weiter zu WhatsApp»
      const oeffnetDialog = href.includes('?text=') && !a.classList.contains('wa-go') && typeof HTMLDialogElement === 'function';
      if (!oeffnetDialog) adsConversion('whatsapp');
    } else if (href.startsWith('tel:')) {
      adsConversion('telefon');
    }
  }, true);

  const removeGoogleCookies = () => {
    const host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').map(c => c.split('=')[0].trim())
      .filter(n => /^(_ga|_gid|_gcl|_gac)/.test(n))
      .forEach(n => ['', '; domain=' + host, '; domain=.' + host].forEach(d => {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
      }));
  };

  let banner = null;
  const hide = () => { if (banner) { banner.remove(); banner = null; } };
  const show = () => {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.aria);
    banner.innerHTML =
      '<p></p><div class="cookie-actions">' +
      '<button type="button" class="cookie-no"></button>' +
      '<button type="button" class="cookie-yes"></button></div>';
    const p = banner.querySelector('p');
    p.textContent = t.msg + ' ';
    const a = document.createElement('a');
    a.href = privacyHref;
    a.textContent = t.more;
    p.appendChild(a);
    banner.querySelector('.cookie-no').textContent = t.no;
    banner.querySelector('.cookie-yes').textContent = t.yes;
    banner.querySelector('.cookie-yes').addEventListener('click', () => { save('yes'); grant(); hide(); });
    banner.querySelector('.cookie-no').addEventListener('click', () => {
      const war = read();
      save('no'); hide();
      if (war === 'yes' || loaded) { removeGoogleCookies(); location.reload(); } // bereits geladenes Google entfernen
    });
    document.body.appendChild(banner);
  };

  const start = () => {
    // Link «Cookie-Einstellungen» im Seitenfuss
    const legal = document.querySelector('.footer .legal');
    if (legal) {
      const b = document.createElement('a');
      b.href = '#';
      b.className = 'cookie-settings';
      b.textContent = t.settings;
      b.addEventListener('click', e => { e.preventDefault(); show(); });
      legal.appendChild(b);
    }
    if (!read()) show();
  };

  if (read() === 'yes') grant();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
