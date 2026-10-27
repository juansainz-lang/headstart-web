// Spanish copy (the site at /es). Must match the shape of en.ts: TypeScript checks it.

import type { Content } from "./index";

export const es: Content = {
  htmlLang: "es",
  locale: "es_ES",
  path: "/es",

  meta: {
    title: "Headstart | Automatización con IA a medida para empresas",
    description:
      "Deja de hacer el trabajo que debería hacer el software. Headstart crea automatizaciones con IA a medida sobre las herramientas que tu empresa ya usa. Empieza con un diagnóstico gratis.",
    keywords: [
      "automatización con IA",
      "automatización de procesos",
      "asistentes de IA para empresas",
      "integraciones a medida",
      "informes automáticos",
      "automatización para pymes",
      "IA para clínicas, hostelería, inmobiliarias, despachos y e-commerce",
      "automatización para el sector de bebidas",
    ],
  },

  cta: "Pide tu diagnóstico gratis",

  nav: {
    links: [
      { href: "#services", label: "Servicios" },
      { href: "#how", label: "Cómo funciona" },
      { href: "#about", label: "Quiénes somos" },
      { href: "#industries", label: "Sectores" },
      { href: "#faq", label: "FAQ" },
    ],
    book: "Diagnóstico gratis",
    home: "Headstart — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    promise: "Tus herramientas · tus datos · sin apps nuevas",
    switchTo: { href: "/", short: "EN", label: "View in English" },
  },

  hero: {
    label: "Automatización con IA a medida",
    lines: ["Deja de hacer el trabajo", "que debería hacer", "el software."],
    highlight: "software",
    sub: "Automatización con IA a medida para empresas cansadas de procesos manuales. Sobre las herramientas que ya usas.",
    how: "Cómo funciona",
    footnote: "Tus herramientas · tus datos · sin apps nuevas · sin formación",
    statement: ["Tu negocio,", "en piloto automático."],
    scroll: "Baja",
  },

  marquee: [
    "Tareas que se hacen solas",
    "IA que atiende por ti",
    "Tus herramientas, conectadas",
    "Tus números, siempre al día",
    "Tus datos son tuyos",
    "Diagnóstico gratis",
  ],

  pains: {
    label: "El problema",
    lines: ["¿Te suena?"],
    highlight: "suena?",
    sub: "Cada empresa es distinta. El trabajo pesado es el mismo.",
    items: [
      ["Tu equipo copia datos de un sitio a otro.", "Del email al Excel, del Excel al programa. Cada día."],
      ["Los clientes escriben y nadie contesta a tiempo.", "Y el que tarda en contestar, pierde al cliente."],
      ["Para saber cómo va el negocio, alguien tiene que montar un informe.", "Siempre tarde, siempre a mano."],
    ],
    calcLead: "¿Cuántas horas te cuesta? Haz la cuenta.",
  },

  calc: {
    numberLocale: "es-ES",
    yourNumbers: "Tus números",
    people: "Personas en tu equipo",
    personUnit: "persona",
    peopleUnit: "personas",
    hours: "Horas de trabajo manual por persona y semana",
    note: "Datos, emails, informes, facturas. Sobre {weeks} semanas laborables al año.",
    result: "horas al año que tu equipo dedica a trabajo manual.",
    weeksLead: "Son",
    weeksTail: "semanas completas de trabajo",
    every: "Cada año.",
    weekTitle: "Una semana normal · ¿quién hace el trabajo pesado?",
    weekAria: "Quién hace el trabajo pesado",
    yourTeam: "Tu equipo",
    ai: "IA de Headstart",
    person: "Persona",
    aiLane: "IA",
    idle: "Libre",
    focus: "Trabajo real",
    aiLine: "El trabajo pesado se sigue haciendo: solo que ya no lo hace tu equipo.",
    teamLine: "{focus} h de trabajo real, {hours} h de trabajo pesado. Cada semana.",
    tasks: ["Datos", "Emails", "Informes", "Facturas"],
  },

  services: {
    label: "Servicios",
    lines: ["Lo que hacemos", "por tu empresa."],
    highlight: "tu empresa.",
    intro: "Cada proyecto es a medida, sobre las herramientas que ya usas. Cuatro formas de devolverle el tiempo a tu equipo.",
    cards: [
      {
        id: "workflows",
        n: "01",
        name: "Tareas que se hacen solas",
        tech: "Automatización de procesos",
        pitch: "Todo lo que tu equipo repite cada día —pasar datos, enviar emails, pedir aprobaciones— funcionando solo.",
      },
      {
        id: "agents",
        n: "02",
        name: "Asistentes de IA que atienden por ti",
        tech: "Agentes de IA",
        pitch: "Leen emails, mensajes y formularios, entienden qué piden y responden, o se lo pasan a la persona correcta. A cualquier hora.",
      },
      {
        id: "integrations",
        n: "03",
        name: "Tus herramientas, conectadas",
        tech: "Integraciones a medida",
        pitch: "Tu CRM, tu facturación, tu web y tus hojas de cálculo hablando entre ellos. Se acabó copiar y pegar.",
      },
      {
        id: "intelligence",
        n: "04",
        name: "Tus números, siempre al día",
        tech: "Inteligencia operativa",
        pitch: "Informes y alertas que se generan solos. Sabes cómo va el negocio sin pedírselo a nadie.",
      },
    ],
    promise: ["Con tus herramientas", "Tus datos son tuyos", "Sin formación"],
  },

  flow: {
    label: "Así se ve",
    lines: ["Llega una petición.", "Nadie la toca."],
    highlight: "Nadie",
    intro: "Elige una petición y mira cómo se resuelve sola: clasificada, extraída, ejecutada y registrada.",
    pick: "Elige una petición",
    inbox: "Bandeja de entrada",
    steps: ["Llega la petición", "La IA clasifica", "Extrae los datos", "Lanza la acción", "Registra e informa"],
    replay: "Repetir",
    exampleTag: "Ejemplo",
    footnote: "Ejemplo · empresas y datos ficticios",
    done: "Resuelto en segundos. Nadie ha copiado y pegado nada.",
    examples: [
      {
        id: "clinic",
        tab: "Clínica estética",
        from: "maria.g@email.com",
        subject: "¿Cita para relleno de labios la semana que viene?",
        body: "¡Hola! Me gustaría reservar una consulta de relleno de labios el martes o miércoles por la tarde. Es mi primera vez con vosotros. Gracias, María",
        intent: "Nueva reserva",
        priority: "Alta · clienta nueva",
        fields: [
          ["Tratamiento", "Consulta relleno de labios"],
          ["Preferencia", "Mar / Mié, tarde"],
          ["Cliente", "Nueva · María G."],
        ],
        actions: ["Hueco ofrecido: mar 16:30", "Formulario de admisión enviado", "Lead añadido al CRM"],
        report: "Reservas esta semana: 38 · por email: 12",
      },
      {
        id: "hotel",
        tab: "Hotel",
        from: "events@northbridge-co.com",
        subject: "Reserva de grupo — 24 habitaciones, 12–14 de marzo",
        body: "Organizamos nuestro offsite anual: 24 habitaciones 2 noches y una sala de reuniones para 30. ¿Nos enviáis presupuesto antes del viernes?",
        intent: "Presupuesto de grupo",
        priority: "Alta · plazo viernes",
        fields: [
          ["Habitaciones", "24 × 2 noches"],
          ["Fechas", "12–14 mar"],
          ["Extras", "Sala de reuniones, 30 pax"],
        ],
        actions: ["Disponibilidad comprobada", "Presupuesto preparado para revisar", "Aviso al responsable comercial"],
        report: "Peticiones de grupo este mes: 9 · respuesta media: 14 min",
      },
      {
        id: "distributor",
        tab: "Distribuidor",
        from: "orders@riverside-market.com",
        subject: "Pedido #4471 — pedido semanal",
        body: "Adjuntamos el pedido de esta semana: 18 cajas de Cabernet 750 ml y 12 cajas de Rosado 750 ml. Entrega el jueves.",
        intent: "Pedido de compra",
        priority: "Normal · entrega jueves",
        fields: [
          ["Pedido", "#4471"],
          ["Artículos", "18 cj Cabernet · 12 cj Rosado"],
          ["Entrega", "Jueves"],
        ],
        actions: ["Pedido registrado en el ERP", "Confirmación enviada", "Stock reservado"],
        report: "Pedidos procesados hoy: 27 · errores: 0",
      },
    ],
  },

  how: {
    label: "Cómo funciona",
    lines: ["Tres pasos.", "Cero complicaciones."],
    highlight: "Cero complicaciones.",
    intro: "De la primera llamada a un sistema que funciona solo.",
    steps: [
      {
        phase: "Paso 01",
        name: "Diagnóstico gratis",
        title: "Encontramos qué automatizar primero.",
        body: "Hablamos sobre cómo trabaja tu empresa y te mostramos dónde pierdes más tiempo. Sin compromiso.",
      },
      {
        phase: "Paso 02",
        name: "Lo construimos",
        title: "Sobre las herramientas que ya usas.",
        body: "Diseñamos y construimos las automatizaciones a la medida de tu negocio. Tú apruebas cada paso.",
      },
      {
        phase: "Paso 03",
        name: "Funciona y mejora",
        title: "Recuperas tu tiempo.",
        body: "Lo ponemos en marcha, medimos las horas que ahorras y lo seguimos afinando.",
      },
    ],
  },

  about: {
    label: "Quiénes somos",
    lines: ["Hemos visto cómo ganan los grandes.", "Ahora te toca a ti."],
    highlight: "te toca a ti.",
    paragraphs: [
      "Somos Nacho y Juan, dos jóvenes apasionados por el negocio y la tecnología. Durante años trabajamos para multinacionales en China, Arabia Saudí, Estados Unidos, Londres y España. Vimos desde dentro cómo funcionan las grandes corporaciones, y descubrimos algo que nadie te cuenta.",
      "No ganan porque tengan mejores personas. Ganan porque tienen sistemas que trabajan por ellas: ejércitos de ingenieros y millones invertidos para que nadie pierda el tiempo en lo que una máquina puede hacer.",
      "Mientras tanto, vimos a pequeñas empresas con un talento enorme apagando fuegos hasta las once de la noche. Contestando emails, pasando datos, persiguiendo facturas. Compitiendo con las manos atadas.",
      "Eso ha cambiado. La inteligencia artificial ha puesto al alcance de cualquier empresa lo que antes solo podían pagar las más grandes. Por primera vez, un equipo de cinco personas puede trabajar con la potencia de uno de cinco mil.",
      "Por eso creamos Headstart, que significa «ventaja de salida». Eso es lo que queremos darte. No vendemos software ni plantillas: nos sentamos contigo, entendemos tu negocio y construimos lo que necesitas para que tú y tu equipo volváis a dedicaros a lo que de verdad importa.",
    ],
    quote: "La IA ya no es cosa de gigantes. Es tu turno.",
    more: "Leer la historia completa",
    signature: "Nacho y Juan, fundadores",
    countriesLabel: "Dónde aprendimos",
    countries: ["China", "Arabia Saudí", "Estados Unidos", "Londres", "España"],
  },

  industries: {
    label: "Sectores",
    lines: ["Todos los sectores.", "Los mismos problemas."],
    highlight: "Los mismos problemas.",
    intro: "Trabajamos con empresas de todos los sectores, porque el trabajo pesado se repite. Algunos ejemplos:",
    pick: "Elige un sector",
    items: [
      { id: "beverage", name: "Bebidas alcohólicas", sub: "Vino, cerveza y destilados", example: "El informe de cada distribuidor en un solo panel, con una alerta cuando un cliente deja de pedir." },
      { id: "clinics", name: "Clínicas estéticas", sub: "Medicina estética y bienestar", example: "Consultas de Instagram y de tu web respondidas en minutos y convertidas en citas." },
      { id: "hospitality", name: "Hostelería", sub: "Restaurantes, hoteles y bares", example: "Peticiones de grupos y eventos presupuestadas el mismo día, y facturas de proveedores archivadas sin teclear." },
      { id: "real-estate", name: "Inmobiliarias", sub: "Agencias y gestores de propiedades", example: "Leads de portales respondidos y cualificados en minutos, y visitas agendadas solas." },
      { id: "professional", name: "Despachos profesionales", sub: "Abogados y asesorías", example: "Altas de clientes y peticiones de documentos enviadas y controladas automáticamente." },
      { id: "ecommerce", name: "E-commerce y retail", sub: "Tiendas online y multicanal", example: "Un asistente de IA que responde dudas de pedidos y devoluciones 24/7, con el stock sincronizado entre canales." },
    ],
    popularLabel: "Lo que más nos piden, en todos los sectores",
    popular: [
      ["Web con atención de IA", "Atiende a cada visitante 24/7, de forma personalizada, y pasa los leads a tu equipo."],
      ["Facturas", "Capturadas, revisadas y enviadas a contabilidad. Las tuyas, emitidas y reclamadas solas."],
      ["Presupuestos", "Preparados en minutos a partir de cada petición, con tus precios y condiciones."],
      ["Seguimiento de presupuestos", "Cada presupuesto abierto, seguido en el momento justo hasta que sea un sí o un no."],
      ["Adiós a los no-shows", "Confirmaciones, recordatorios y cambios de cita fáciles."],
      ["Trabajos externos", "Subcontratas y proveedores coordinados: quién hace qué, para cuándo y qué va tarde."],
    ],
  },

  faq: {
    label: "FAQ",
    lines: ["Respuestas", "claras."],
    items: [
      {
        q: "¿Qué hacéis exactamente?",
        a: "Automatizamos empresas con IA: tareas que se hacen solas, asistentes que atienden por ti, tus herramientas conectadas y tus números siempre al día. Todo a medida.",
      },
      {
        q: "¿Es para mi empresa?",
        a: "Si tu equipo pierde horas en trabajo repetitivo —datos, emails, presupuestos, facturas, citas, informes—, sí. Trabajamos con empresas de todos los sectores.",
      },
      {
        q: "¿Necesito software nuevo o formación?",
        a: "No. Trabajamos sobre las herramientas que ya usas. Nadie tiene que aprender una app nueva.",
      },
      {
        q: "¿Qué pasa con mis datos?",
        a: "Siguen siendo tuyos. Las automatizaciones funcionan dentro de tus propios sistemas y cuentas.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "El diagnóstico es gratis. Después te damos un presupuesto cerrado antes de empezar nada.",
      },
    ],
  },

  contact: {
    label: "Gratis · Sin compromiso",
    lines: ["¿Cuánto tiempo recuperaría", "tu equipo?"],
    highlight: "recuperaría",
    body: "Descúbrelo en una llamada. El diagnóstico es gratis y sin compromiso.",
    orEmail: "o escribe a",
  },

  footer: {
    tag: "Tus herramientas · tus datos · ejemplos claramente marcados",
    privacy: "Privacidad",
  },

  booking: {
    pick: "Elige el momento que mejor te venga",
    title: "Agenda tu diagnóstico gratis",
    loading: "Cargando horarios disponibles…",
    iframe: "Elige la hora de tu llamada",
    close: "Cerrar",
    tz: "Los horarios se muestran en tu zona horaria. La llamada se agenda en inglés en el calendario; la hacemos en español.",
    openTab: "Abrir el calendario en otra pestaña",
    booked: "¡Reservado!",
    bookedBody: "Revisa tu email: te ha llegado la invitación. Hablamos pronto.",
    back: "Volver a la web",
  },


  titles: [
    ["pains", "¿Te suena?"],
    ["services", "Servicios"],
    ["demo", "Así se ve"],
    ["how", "Cómo funciona"],
    ["about", "Quiénes somos"],
    ["industries", "Sectores"],
    ["faq", "FAQ"],
    ["contact", "Diagnóstico gratis"],
  ],

  company: {
    summary:
      "Headstart crea automatizaciones con IA a medida para empresas cansadas de procesos manuales: tareas que se hacen solas, asistentes de IA que atienden por ellas, herramientas conectadas e informes siempre al día, sobre las herramientas que cada empresa ya usa. Fundada por Nacho y Juan.",
    promise:
      "Cada proyecto empieza con un diagnóstico gratis de cómo trabaja la empresa. Automatizamos las herramientas que ya tiene: sin apps nuevas, sin formación, y los datos del cliente se quedan en sus sistemas.",
  },
};
