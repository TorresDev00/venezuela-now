// Diccionario de traducción propio (sin librerías de i18n de terceros).
// Inglés es el contenido PRINCIPAL (mercado objetivo: EE.UU.), español es la
// traducción para la diáspora venezolana — no al revés.

export const languages = {
  en: "English",
  es: "Español",
} as const;

export const defaultLang = "en";

// Mapa de rutas equivalentes entre idiomas. La clave es el nombre lógico de
// la página; el valor es el slug (sin barras) que le corresponde en cada
// idioma. Home usa slug vacío.
export const routes = {
  home: { en: "", es: "" },
  donate: { en: "donate", es: "donar" },
  about: { en: "about", es: "acerca" },
  news: { en: "news", es: "noticias" },
  privacy: { en: "privacy", es: "privacidad" },
  terms: { en: "terms", es: "terminos" },
} as const;

export const ui = {
  en: {
    "meta.title": "Venezuela NOW — Help Earthquake Survivors in Venezuela",
    "meta.description":
      "Venezuela NOW, Inc. is a 501(c)(3) nonprofit dedicated to supporting survivors of the Venezuela earthquakes with food, shelter, and medical care.",

    "nav.ourWork": "Our Work",
    "nav.getInvolved": "Get Involved",
    "nav.about": "About",
    "nav.news": "News",
    "nav.donate": "Donate",
    "nav.homeAria": "Venezuela NOW – Home",
    "nav.openMenu": "Open navigation menu",
    "nav.langLabel": "Language",

    "hero.sectionAria": "Homepage banner",
    "hero.imageAlt": "Buildings damaged by the earthquake in Venezuela",
    "hero.title": "Help survivors of the Venezuela earthquakes",
    "hero.subtitle":
      "Thousands of Venezuelan families have lost everything. Your support brings food, shelter, and hope today.",
    "hero.ctaPrimary": "Donate now",
    "hero.ctaSecondary": "Learn about the crisis",
    "hero.trustBadge": "Secure · Processed by Stripe · Tax-deductible",
    "hero.scrollHint": "Learn more",

    "situation.heading": "The crisis in Venezuela",
    "situation.body":
      "The earthquakes that struck Venezuela left tens of thousands of families without homes, clean water, or medical care. This humanitarian crisis demands an urgent response — and you can be part of the solution.",
    "situation.stat1Label": "People affected",
    "situation.stat1Desc": "Venezuelans directly affected by the 2024 earthquakes.",
    "situation.stat2Label": "Families displaced",
    "situation.stat2Desc": "Homes completely destroyed that need urgent help.",
    "situation.stat3Label": "Communities reached",
    "situation.stat3Desc": "Communities we've already brought humanitarian aid to.",

    "stories.heading": "Stories and news",
    "stories.subtitle": "What's happening on the ground.",
    "stories.viewAll": "View all →",
    "stories.readMore": "Read more →",

    "about.eyebrow": "Who we are",
    "about.titlePre": "Real help, driven by",
    "about.titleHighlight": "faith.",
    "about.titlePost": "",
    "about.tagline": "We sow hope and cultivate a thriving future for Venezuelan families.",
    "about.body":
      "Since 1996, Venezuela Now has brought medical care, education, and humanitarian aid to communities across Venezuela — through a network of local clinics, schools, and trained leaders. Fully Venezuelan-led since 2015, our work is rooted in faith and proven by results: thousands of patients treated, hundreds of children educated, and communities rebuilt from the ground up.",
    "about.linkMore": "Learn more about our mission",
    "about.videoAlt": "Venezuela Now team at work in local communities",
    "about.videoPlayAria": "Play video: our work in Venezuela",
    "about.videoTitle": "Video: our work in Venezuela",
    "about.since": "Since 1996:",
    "about.stat1Label": "Students at SEMWESVEN",
    "about.stat2Label": "Leaders trained (ILI)",
    "about.stat3Label": "Congregations established",
    "about.stat4Label": "Patients served (Wesley Medical Centers, 2025)",

    "cta.eyebrow": "Take action now",
    "cta.heading": "Donate today",
    "cta.body": "Every dollar goes directly to survivors. Let's not wait — they need help now.",
    "cta.button": "Donate now",
    "cta.footnote": "Your donation is tax-deductible · Secure payment processed by Stripe",

    "footer.srHeading": "Footer",
    "footer.mission":
      "Venezuela NOW, Inc. is a 501(c)(3) nonprofit dedicated to supporting survivors of natural disasters in Venezuela.",
    "footer.navHeading": "Navigation",
    "footer.legalHeading": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    "footer.donateButton": "Donate now",
    "footer.orgLine": "Venezuela NOW, Inc. · 501(c)(3) nonprofit organization",
    "footer.allRightsReserved": "All rights reserved.",
    "footer.stripeLine1": "Payments securely processed by Stripe.",
    "footer.stripeLine2": "We do not store card data.",

    "donate.heading": "Donate to Venezuela NOW",
    "donate.body": "Our secure donation form is coming soon.",

    "aboutPage.heading": "About Venezuela NOW",
    "aboutPage.body": "Our full story is coming soon.",

    "newsPage.heading": "News",
  },
  es: {
    "meta.title": "Venezuela NOW — Ayuda a los sobrevivientes del terremoto",
    "meta.description":
      "Venezuela NOW, Inc. es una organización sin fines de lucro 501(c)(3) dedicada a apoyar a los sobrevivientes de los terremotos en Venezuela con alimentos, refugio y atención médica.",

    "nav.ourWork": "Nuestro trabajo",
    "nav.getInvolved": "Involucrarse",
    "nav.about": "Acerca de",
    "nav.news": "Noticias",
    "nav.donate": "Donar",
    "nav.homeAria": "Venezuela NOW – Inicio",
    "nav.openMenu": "Abrir menú de navegación",
    "nav.langLabel": "Idioma",

    "hero.sectionAria": "Portada",
    "hero.imageAlt": "Edificios afectados por el terremoto en Venezuela",
    "hero.title": "Ayuda a los sobrevivientes de los terremotos en Venezuela",
    "hero.subtitle":
      "Miles de familias venezolanas lo han perdido todo. Tu apoyo les da comida, refugio y esperanza hoy.",
    "hero.ctaPrimary": "Donar ahora",
    "hero.ctaSecondary": "Conocer la situación",
    "hero.trustBadge": "Seguro · Procesado por Stripe · Deducible de impuestos",
    "hero.scrollHint": "Conocer más",

    "situation.heading": "La situación en Venezuela",
    "situation.body":
      "Los terremotos que sacudieron Venezuela dejaron a decenas de miles de familias sin hogar, sin agua potable y sin acceso a atención médica. La crisis humanitaria exige una respuesta urgente — y tú puedes ser parte de la solución.",
    "situation.stat1Label": "Personas afectadas",
    "situation.stat1Desc": "Venezolanos impactados directamente por los sismos de 2024.",
    "situation.stat2Label": "Familias sin hogar",
    "situation.stat2Desc": "Hogares completamente destruidos que requieren ayuda urgente.",
    "situation.stat3Label": "Comunidades alcanzadas",
    "situation.stat3Desc": "Comunidades a las que ya llevamos ayuda humanitaria.",

    "stories.heading": "Historias y noticias",
    "stories.subtitle": "Lo que está pasando en el terreno.",
    "stories.viewAll": "Ver todas →",
    "stories.readMore": "Leer más →",

    "about.eyebrow": "Quiénes somos",
    "about.titlePre": "Ayuda real, impulsada por",
    "about.titleHighlight": "la fe.",
    "about.titlePost": "",
    "about.tagline": "Sembramos esperanza y cultivamos un futuro próspero para las familias venezolanas.",
    "about.body":
      "Desde 1996, Venezuela Now lleva atención médica, educación y ayuda humanitaria a comunidades venezolanas en crisis, a través de una red de clínicas, escuelas y líderes formados. Con liderazgo completamente venezolano desde 2015, nuestro trabajo nace de la fe y se demuestra en resultados: miles de pacientes atendidos, cientos de niños educados y comunidades reconstruidas desde sus bases.",
    "about.linkMore": "Conoce más sobre nuestra misión",
    "about.videoAlt": "Equipo de Venezuela Now trabajando en comunidades locales",
    "about.videoPlayAria": "Reproducir video: nuestra labor en Venezuela",
    "about.videoTitle": "Video: nuestra labor en Venezuela",
    "about.since": "Desde 1996:",
    "about.stat1Label": "Estudiantes en SEMWESVEN",
    "about.stat2Label": "Líderes capacitados (ILI)",
    "about.stat3Label": "Congregaciones consolidadas",
    "about.stat4Label": "Pacientes atendidos (Centros Médicos Wesley, 2025)",

    "cta.eyebrow": "Actúa ahora",
    "cta.heading": "Dona hoy",
    "cta.body": "Cada dólar llega directamente a los sobrevivientes. No esperemos más — ellos necesitan ayuda ahora.",
    "cta.button": "Donar ahora",
    "cta.footnote": "Tu donación es deducible de impuestos · Pago seguro procesado por Stripe",

    "footer.srHeading": "Pie de página",
    "footer.mission":
      "Venezuela NOW, Inc. es una organización sin fines de lucro 501(c)(3) dedicada a apoyar a los sobrevivientes de los desastres naturales en Venezuela.",
    "footer.navHeading": "Navegación",
    "footer.legalHeading": "Legal",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos de uso",
    "footer.donateButton": "Donar ahora",
    "footer.orgLine": "Venezuela NOW, Inc. · Organización 501(c)(3)",
    "footer.allRightsReserved": "Todos los derechos reservados.",
    "footer.stripeLine1": "Pagos procesados de forma segura por Stripe.",
    "footer.stripeLine2": "No almacenamos datos de tarjeta.",

    "donate.heading": "Dona a Venezuela NOW",
    "donate.body": "Nuestro formulario de donación seguro estará disponible pronto.",

    "aboutPage.heading": "Acerca de Venezuela NOW",
    "aboutPage.body": "Nuestra historia completa estará disponible pronto.",

    "newsPage.heading": "Noticias",
  },
} as const;
