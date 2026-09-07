(() => {
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGS = ["en", "ar"];

  async function loadTranslations() {
    const [en, ar] = await Promise.all([
      fetch("locales/en.json").then(r => r.json()),
      fetch("locales/ar.json").then(r => r.json())
    ]);

    await i18next.init({
      lng: localStorage.getItem("language") || DEFAULT_LANG,
      fallbackLng: DEFAULT_LANG,
      resources: {
        en: { translation: en },
        ar: { translation: ar }
      },
      interpolation: { escapeValue: false }
    });

    applyLanguage(i18next.language);

    // Handle BOTH language buttons
    document.querySelectorAll(".language-toggle").forEach(button => {
      button.addEventListener("click", async () => {
        const next = i18next.language === "ar" ? "en" : "ar";

        await i18next.changeLanguage(next);
        applyLanguage(next);
      });
    });
  }

  function applyLanguage(lang) {
    const current = SUPPORTED_LANGS.includes(lang)
      ? lang
      : DEFAULT_LANG;

    const isArabic = current === "ar";

    document.documentElement.lang = current;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    localStorage.setItem("language", current);

    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = i18next.t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(el => {
      el.alt = i18next.t(el.dataset.i18nAlt);
    });

    document.title = i18next.t("pageTitle");

    // Update BOTH language buttons
    document.querySelectorAll(".language-toggle").forEach(toggle => {
      toggle.textContent = isArabic ? "English" : "العربية";

      toggle.setAttribute(
        "aria-label",
        isArabic
          ? "Switch to English"
          : "التبديل إلى العربية"
      );
    });

    window.currentSiteLanguage = current;
  }

  window.contactWhatsApp = function (packageName, price) {
    const phoneNumber = "201044310426";
    const ar = window.currentSiteLanguage === "ar";

    const message = ar
      ? `مرحبًا، أنا مهتم بباقة ${packageName} بسعر ${price}. من فضلك أرسل لي المزيد من التفاصيل.\nالباقة: ${packageName}\nالسعر المبدئي: ${price}\n\nأرغب في معرفة المزيد من التفاصيل ومناقشة متطلباتي.`
      : `Hello, I am interested in the ${packageName} package priced at ${price}. Please provide me with more details.\nPackage: ${packageName}\nStarting Price: ${price}\n\nI'd like to know more details and discuss my requirements.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  window.viaWhatsApp = function () {
    const ar = window.currentSiteLanguage === "ar";

    const message = ar
      ? "مرحبًا، أنا مهتم بإنشاء موقع إلكتروني مخصص. من فضلك أرسل لي المزيد من التفاصيل. أرغب في معرفة المزيد ومناقشة متطلباتي."
      : "Hello, I am interested in creating a custom website. Please provide me with more details. I'd like to know more details and discuss my requirements.";

    window.open(
      `https://wa.me/201044310426?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadTranslations);
  } else {
    loadTranslations().catch(err =>
      console.error("i18n error:", err)
    );
  }
})();
