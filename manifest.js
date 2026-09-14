/* Patagon Advisors — brand data. IIFE, no imports/exports (see 04-critical-gotchas A.1). */
(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Patagon Advisors",
    shortName: "Patagon",
    tagline: "Firma de asesoramiento financiero",
    locality: "Buenos Aires, Argentina",

    nav: [
      { label: "Servicios", href: "servicios.html" },
      { label: "Nosotros", href: "nosotros.html" },
      { label: "Contacto", href: "contacto.html" }
    ],

    contact: {
      whatsappNumber: "5491144491954",
      whatsappDisplay: "+54 9 11 4449-1954",
      whatsappMessage: "Hola, me gustaría agendar una reunión con Patagon Advisors.",
      email: "agustin@atinversiones.com",
      addressLine1: "Marcelo T. de Alvear 934, Piso 6",
      addressLine2: "Ciudad Autónoma de Buenos Aires, Argentina",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Marcelo T. de Alvear 934 piso 6, CABA, Argentina")
    },

    credentials: {
      years: 15,
      entities: ["IEB", "Invíu"],
      regulator: "CNV"
    },

    // The 5 areas — order matters, numbering is 01–05 throughout the site.
    solutions: [
      {
        id: "tesoreria",
        num: "01",
        title: "Ingeniería de Caja y Tesorería Corporativa",
        summary: "Optimización de flujos, rendimiento de saldos y ahorro impositivo.",
        detail: "Calzamos los rendimientos disponibles con los vencimientos reales de la empresa, con atención directa de los socios.",
        bullets: [
          "Rendimientos dinámicos calzados con vencimientos",
          "Revisión de eficiencia impositiva en cada colocación",
          "Reportes de posición consolidada, semana a semana",
          "Optimización de la operatoria cambiaria",
          "Atención directa y personalizada de los socios"
        ],
        image: "solutions-treasury"
      },
      {
        id: "patrimonio",
        num: "02",
        title: "Protección del Patrimonio Familiar y Personal",
        summary: "Multi Family Office, banca privada y planificación financiera para directivos y familias.",
        detail: "Consolidamos cuentas dispersas bajo una misma estrategia y acompañamos la planificación de sucesión a largo plazo.",
        bullets: [
          "Multi Family Office: un único interlocutor para cuentas dispersas",
          "Administración de carteras diversificadas por moneda y plazo",
          "Preservación de capital con horizonte de largo plazo",
          "Planificación patrimonial y sucesoria",
          "Banca privada con seguimiento personalizado"
        ],
        image: "solutions-wealth"
      },
      {
        id: "fal",
        num: "03",
        title: "Fondo de Asistencia Laboral (FAL)",
        summary: "Estructuración, cumplimiento normativo y administración de fondos corporativos.",
        detail: "Estructuramos y administramos el fondo con el rigor normativo que exige un fondo corporativo.",
        bullets: [
          "Estructuración del fondo conforme a normativa vigente",
          "Diseño del reglamento y esquema de aportes",
          "Administración y reporte periódico",
          "Seguimiento ante los organismos de contralor",
          "Cumplimiento normativo continuo"
        ],
        image: "solutions-treasury"
      },
      {
        id: "pyme",
        num: "04",
        title: "Financiamiento PyME Inteligente",
        summary: "Mercado de capitales, descuento de cheques, ONs PyME y avales SGR.",
        detail: "Acompañamos el acceso de la PyME al mercado de capitales, estructurado a medida de su ciclo de negocio.",
        bullets: [
          "Descuento de cheques de pago diferido",
          "Obligaciones Negociables PyME",
          "Avales SGR para mejorar condiciones de acceso",
          "Estructuración a medida del ciclo de negocio",
          "Acompañamiento en el acceso al mercado de capitales"
        ],
        image: "about-meeting"
      },
      {
        id: "agro",
        num: "05",
        title: "El Agro y la Cadena de Valor Rural",
        summary: "Servicios financieros a medida para el sector agropecuario, acopios y productores.",
        detail: "Diseñamos servicios calzados con los ciclos productivos y comerciales del campo.",
        bullets: [
          "Financiamiento calzado con ciclos productivos",
          "Servicios para acopios y cooperativas",
          "Instrumentos de cobertura y capital de trabajo",
          "Estructuras a medida para la cadena de valor rural",
          "Seguimiento de los tiempos comerciales del campo"
        ],
        image: "solutions-agro"
      }
    ],

    differentiators: [
      {
        num: "01",
        title: "Gestión centralizada",
        text: "Un solo interlocutor con visión integral de su posición: tesorería, patrimonio, financiamiento y operatoria cambiaria, en una misma relación."
      },
      {
        num: "02",
        title: "Estrategias a medida e innovación tecnológica",
        text: "Estructuramos servicios personalizados y funcionamos como una tesorería externa para empresas y sus directivos. Usamos inteligencia artificial como herramienta complementaria para el análisis de datos y el monitoreo de mercados — la tecnología potencia el criterio profesional; no lo reemplaza."
      },
      {
        num: "03",
        title: "Asesoramiento independiente",
        text: "No comercializamos productos propios. Antes de recomendar, explicamos cómo se cobra cada instrumento, qué alternativas existen y por qué elegimos una — sin conflictos de interés asociados a la venta."
      },
      {
        num: "04",
        title: "Cercanía profesional",
        text: "Profesionales matriculados ante la CNV realizan un seguimiento cercano de cada cuenta, con atención directa de los socios en cada etapa de la relación."
      }
    ],

    sectors: [
      "Empresas", "PyMEs", "Empresas Familiares", "Directivos y Gerentes",
      "Familias con Patrimonio", "Productores Agropecuarios", "Acopios",
      "Cadena de Valor Rural"
    ],

    team: [
      {
        id: "agustin",
        name: "Agustín Moresco",
        role: "Socio · Financial Advisor",
        credentials: ["Lic. en Administración de Empresas (UCA)", "Idóneo en mercado de capitales (CNV) — matrícula 2783"],
        photo: "team-agustin"
      },
      {
        id: "fernando",
        name: "Fernando Loyola",
        role: "Socio · Financial Advisor",
        credentials: ["Lic. en Administración de Empresas y Contador Público (UCA)", "MBA (UCEMA)", "Idóneo en mercado de capitales (CNV) — matrícula 990"],
        photo: "team-fernando"
      },
      {
        id: "geronimo",
        name: "Gerónimo Flores Cárdenas",
        role: "Administración",
        credentials: ["Estudiante de Lic. en Administración de Empresas (UCA)"],
        photo: "team-geronimo"
      }
    ]
  };
})();
