(() => {
  // Isi hanya setelah mendapat Publisher ID dan Ad Slot resmi dari AdSense.
  const publisherId = "";
  const adSlot = "";

  if (!/^ca-pub-\d+$/.test(publisherId) || !/^\d+$/.test(adSlot)) {
    return;
  }

  const adContainers = document.querySelectorAll("[data-adsense-slot]");
  if (!adContainers.length) return;

  const adsenseScript = document.createElement("script");
  adsenseScript.async = true;
  adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
  adsenseScript.crossOrigin = "anonymous";
  document.head.appendChild(adsenseScript);

  adContainers.forEach((container) => {
    container.hidden = false;

    const ad = document.createElement("ins");
    ad.className = "adsbygoogle";
    ad.style.display = "block";
    ad.dataset.adClient = publisherId;
    ad.dataset.adSlot = adSlot;
    ad.dataset.adFormat = "auto";
    ad.dataset.fullWidthResponsive = "true";
    container.appendChild(ad);

    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  });
})();
