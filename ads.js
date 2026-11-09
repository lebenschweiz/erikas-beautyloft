// Google Ads: misst, ob jemand nach einem Anzeigenklick Kontakt aufnimmt
// (WhatsApp, Telefon oder Kontaktformular). Konto «erika's», Google-Tag AW-11349567712.
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'AW-11349567712');

(() => {
  const labels = {
    whatsapp: 'AW-11349567712/Mwr1CNaAoLUdEODR8qMq', // WhatsApp-Klick (Website)
    telefon: 'AW-11349567712/ZG3UCNmAoLUdEODR8qMq',  // Telefon-Klick (Website)
    formular: 'AW-11349567712/ttfMCNyAoLUdEODR8qMq'  // Kontaktformular gesendet (Website)
  };
  window.adsConversion = art => {
    if (labels[art]) gtag('event', 'conversion', { send_to: labels[art], transport_type: 'beacon' });
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
})();
