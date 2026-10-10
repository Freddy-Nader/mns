// Interface copy and pre-translated enums (ADR-0002). Every string here exists
// in both languages; en.ts is type-checked against this file.

export const es = {
  intl: "es-MX",

  meta: {
    title: "Mauricio Nader — Pianista",
    description:
      "Pianista mexicano, concertista de Bellas Artes. Próximas fechas, programas para contratar, clases, partituras y arreglos por encargo.",
    fechasTitle: "Fechas — Mauricio Nader",
    fechasDescription:
      "Todas las fechas publicadas de Mauricio Nader: recitales, conciertos con orquesta y masterclasses.",
    paginas: {
      programas: {
        title: "Programas — Mauricio Nader",
        description:
          "Conciertos con nombre y repertorio definidos, y 28 conciertos con orquesta, para festivales, recintos e instituciones.",
      },
      clases: {
        title: "Clases — Mauricio Nader",
        description:
          "Clases particulares de piano y música de cámara, masterclasses en español o inglés, y el curso de música.",
      },
      partituras: {
        title: "Partituras — Mauricio Nader",
        description: "Arreglos, transcripciones y obras originales para piano, con su grabación como muestra.",
      },
      encargos: {
        title: "Encargos — Mauricio Nader",
        description: "Arreglos, transcripciones y obras nuevas por encargo, para concierto, evento, disco o cine.",
      },
      bio: {
        title: "Biografía — Mauricio Nader",
        description:
          "Trayectoria, formación, premios, orquestas, discos y prensa de Mauricio Nader, pianista mexicano y concertista de Bellas Artes.",
      },
      contacto: {
        title: "Contacto — Mauricio Nader",
        description: "Contratación, clases, encargos y prensa: una vía para cada asunto, y su línea directa.",
      },
    },
  },

  nav: {
    label: "Principal",
    fechas: "Fechas",
    programas: "Programas",
    clases: "Clases",
    partituras: "Partituras",
    encargos: "Encargos",
    bio: "Bio",
    contacto: "Contacto",
    open: "Abrir menú",
    close: "Cerrar menú",
    lang: "Idioma",
  },

  /** The three jobs visitors come to do (CONTEXT.md). Never top-level nav. */
  segmentos: { asistir: "Asistir", aprender: "Aprender", contratar: "Contratar" },

  links: {
    proximasFechas: "Próximas fechas",
    todasLasFechas: "Todas las fechas",
    programas: "Programas",
    programasDisponibles: "Programas disponibles",
    escucha: "Escucha y ve",
    clasesParticulares: "Clases particulares",
    masterclasses: "Masterclasses",
    curso: "Curso de música",
    partituras: "Partituras",
    contratacion: "Contratación",
    encargos: "Encargos y arreglos",
    kit: "Kit de prensa",
    bio: "Bio",
    prensa: "Prensa",
    youtube: "YouTube",
    contacto: "Contacto",
  },

  hero: {
    eyebrow: "Pianista · Concertista de Bellas Artes",
    line: "Del barroco al cine, en veintidós países y más de treinta discos.",
    fechas: "Próximas fechas",
    contratar: "Contratar",
    photoAlt: "Mauricio Nader retratado dentro de la tapa abierta de un piano de cola.",
  },

  prensa: { label: "Prensa" },

  servicios: {
    title: "Qué hace",
    conciertos: {
      label: "Conciertos",
      title: "Escúchalo en vivo",
      next: "Próxima fecha",
      none: "Consulta el calendario completo.",
      cta: "Ver fechas",
    },
    programas: {
      label: "Programas",
      title: "Llévalo a tu escenario",
      text: "{n} programas con nombre y 28 conciertos con orquesta, listos para tu temporada.",
      cta: "Ver programas",
    },
    clases: {
      label: "Clases",
      title: "Aprende con él",
      text: "Clases particulares, masterclasses en español o inglés y curso de música.",
      next: "Próxima masterclass",
      cta: "Ver clases",
    },
    partituras: {
      label: "Partituras",
      title: "Tócalo tú",
      text: "{n} arreglos, transcripciones y obras suyas en PDF, desde {min}.",
      cta: "Ver partituras",
    },
    encargos: {
      label: "Encargos",
      title: "Un arreglo para ti",
      text: "Arreglos, transcripciones y obras nuevas, escritos para tu concierto, tu evento o tu grabación.",
      cta: "Empezar un encargo",
    },
  },

  fechas: {
    title: "Próximas fechas",
    pageTitle: "Fechas",
    pageIntro: "Todas sus fechas publicadas, de la más próxima a la más lejana.",
    resumen: "Las {n} más próximas de {total} publicadas.",
    all: "Ver todas las fechas",
    empty: "Por ahora no hay fechas publicadas.",
    noTime: "Hora por confirmar",
    online: "En línea",
    acceso: {
      "entrada-libre": "Entrada libre",
      boletos: "Boletos",
      taquilla: "Taquilla",
      inscripcion: "Inscripción",
      "por-confirmar": "Acceso por confirmar",
    },
    buy: "Comprar boletos",
    enrol: "Inscribirse",
    directions: "Cómo llegar",
  },

  escucha: {
    title: "Escucha y ve",
    intro: "Sus conciertos y sus arreglos, en video.",
    channel: "Ver los {n} videos en YouTube",
    play: "Reproducir",
    playing: "Reproduciendo",
    more: "Más videos",
    score: "Partitura",
  },

  programas: {
    title: "Programas",
    intro: "Conciertos completos, con nombre y repertorio definidos, listos para tu temporada.",
    featured: "Su programa más activo · {n} fechas en {year}",
    upcoming: "Próximas fechas de este programa",
    request: "Solicitar este programa",
    requestShort: "Solicitar",
    formato: {
      recital: "Recital",
      orquesta: "Con orquesta",
      charla: "Concierto y charla",
    },
    photoAlt: "Mauricio Nader en un recital de Piano de Película, visto desde el público.",
    booking: {
      title: "¿Programas una temporada?",
      text: "Escríbele para disponibilidad, honorarios y material de prensa: biografía, fotografías y repertorio con orquesta.",
      emergency:
        "Disponible para reemplazos de emergencia: prepara conciertos, grabaciones y cursos con poca anticipación cuando otro solista cancela.",
      cta: "Consultar disponibilidad",
      kit: "Pedir kit de prensa",
      stats: [
        { n: "22", l: "países" },
        { n: "30+", l: "discos" },
        { n: "800+", l: "presentaciones" },
        { n: "28", l: "conciertos con orquesta" },
      ],
    },
  },

  bio: {
    label: "Sobre Mauricio Nader",
    paragraphs: [
      "Empezó a tocar a los nueve años y a los diecinueve debutó como solista con la Orquesta Sinfónica Nacional en el Palacio de Bellas Artes. Estudió en el Conservatorio Nacional, en Houston y en Eastman, donde recibió por unanimidad el Performer’s Certificate.",
      "Hoy es concertista de Bellas Artes con el rango de concertino. Ha tocado en veintidós países, grabado más de treinta discos y estrenado en México los Makrokosmos de George Crumb. Da clases particulares, imparte masterclases y escribe arreglos por encargo.",
    ],
    cta: "Leer la biografía completa",
    photoA: "Mauricio Nader de perfil, tocando un piano de cola ante el público.",
    photoB: "Recital de Mauricio Nader en la Casona de Xicoténcatl, visto desde el público.",
  },

  clases: {
    title: "Clases",
    intro:
      "Para quien prepara un concurso o una audición, y para quien vuelve al piano después de años. Se empieza desde tu propio nivel.",
    particulares: {
      label: "Clases particulares",
      title: "Piano y música de cámara",
      rows: [
        ["Para", "Estudiantes, profesionales y aficionados"],
        ["Formato", "Individual"],
        ["Primer paso", "Un mensaje con tu nivel y lo que quieres tocar"],
      ],
      cta: "Escribir por WhatsApp",
      message: "Hola, Mauricio. Me interesa tomar clases de piano contigo.",
    },
    masterclasses: {
      label: "Masterclasses",
      title: "Para escuelas, festivales y conservatorios",
      rows: [
        ["Para", "Estudiantes y profesionales de todos los niveles"],
        ["Disciplinas", "Piano y música de cámara"],
      ],
      next: "Próxima",
      cta: "Organizar una masterclass",
    },
    curso: {
      label: "Curso de música",
      title: "Piano, música de cámara, voz y piano",
      rows: [
        ["Convocatoria", "Bases e inscripción en línea"],
        ["Informes", "curso.musika@gmail.com"],
      ],
      cta: "Ver bases e inscripción",
    },
    proof:
      "Sus alumnos han ganado concursos nacionales e internacionales y han seguido sus estudios en la Manhattan School of Music, la Universidad de Houston, el Conservatorio Giuseppe Verdi de Milán y el Conservatorio de Róterdam.",
    position:
      "Desde 2006 es director académico y profesor de piano del Centro Mexicano de Posgrados en Música, en Puebla.",
    metodo: {
      title: "Cómo es una masterclass",
      intro:
        "En español o en inglés, en cualquier ciudad. Parte de una convicción suya: el nivel, la personalidad y los intereses de cada músico piden atención personal.",
      points: [
        {
          t: "Hacer música con más naturalidad",
          d: "Técnica, musicalidad, fraseo, memoria, concentración y maneras de estudiar una obra, con hábitos que piden menos desgaste físico y mental.",
        },
        {
          t: "Tocar ante público",
          d: "Cada participante presenta el repertorio que elija, del barroco a lo contemporáneo, y puede grabarse para estudiarlo después.",
        },
        {
          t: "Abierta a oyentes",
          d: "Músicos y público general pueden asistir a escuchar.",
        },
        {
          t: "Diálogo directo",
          d: "Preguntas y conversación con él y con los demás participantes.",
        },
      ],
    },
    upcoming: "Próximas masterclasses y cursos",
  },

  partituras: {
    title: "Partituras",
    intro:
      "Sus arreglos, transcripciones y obras propias, en PDF. Antes de comprar, escúchalas tocadas por él.",
    tipo: {
      arreglo: "Arreglo",
      transcripcion: "Transcripción",
      original: "Obra original",
    },
    listen: "Escuchar",
    buy: "Comprar",
    store: "Ver las {n} en la tienda",
    note: "Pago y descarga en su tienda en línea, Lemon Squeezy.",
  },

  encargos: {
    title: "Encargos",
    intro:
      "Arreglos, transcripciones y obras nuevas, escritos para tu proyecto. Es el oficio detrás de sus partituras: el Huapango de Moncayo, la Rhapsody in Blue, El amor brujo.",
    film: "También graba piano para cine y televisión: Güeros, de Alonso Ruizpalacios, es una de esas películas.",
    price:
      "El precio depende de la duración, la instrumentación y la fecha de entrega. Primero se platica; después se cotiza.",
    scores: "Escuchar sus arreglos",
    form: {
      label: "Cuéntale tu proyecto",
      que: {
        label: "¿Qué necesitas?",
        options: ["Arreglo", "Transcripción", "Obra nueva", "Grabación", "Otro"],
      },
      para: {
        label: "¿Para qué es?",
        options: ["Concierto", "Boda o evento", "Disco o video", "Cine o publicidad", "Estudio personal"],
      },
      instrumentos: {
        label: "¿Para qué instrumentos?",
        options: ["Piano solo", "Piano a cuatro manos", "Voz y piano", "Ensamble de cámara", "Orquesta"],
      },
      cuando: {
        label: "¿Para cuándo?",
        options: ["Menos de un mes", "De uno a tres meses", "Más de tres meses", "Sin fecha fija"],
      },
      detalles: { label: "Cuéntale más", placeholder: "La obra, la duración, quién la va a tocar…" },
      nombre: { label: "Tu nombre", placeholder: "Nombre y apellido" },
      optional: "opcional",
      whatsapp: "Enviar por WhatsApp",
      email: "Enviar por correo",
      privacy:
        "El mensaje se abre en tu WhatsApp o en tu correo, listo para enviar. Este sitio no guarda nada.",
      message: {
        greeting: "Hola, Mauricio. Te escribo por un encargo.",
        que: "Qué",
        para: "Para",
        instrumentos: "Instrumentos",
        cuando: "Para cuándo",
        detalles: "Detalles",
        subject: "Encargo",
      },
    },
  },

  contacto: {
    title: "Contacto",
    quote: "Gracias por visitar mi página. Siempre estoy disponible.",
    contratacion: {
      label: "Contratación",
      text: "Conciertos, recitales, festivales, orquestas e instituciones.",
      cta: "Formulario de contratación",
    },
    clases: {
      label: "Clases y curso",
      text: "Clases particulares, masterclasses y el curso de música.",
      cta: "WhatsApp",
    },
    encargos: {
      label: "Encargos",
      text: "Arreglos, transcripciones, obras nuevas y grabaciones.",
      cta: "Contar mi proyecto",
    },
    prensa: {
      label: "Prensa",
      text: "Entrevistas, fotografías y kit de prensa.",
      cta: "Escribir a prensa",
      subject: "Prensa",
    },
    direct: "Línea directa",
    city: "Ciudad de México",
    subjects: {
      contratacion: "Contratación",
      kit: "Kit de prensa",
      bio: "Biografía completa",
      programa: "Programa",
      masterclass: "Masterclass",
    },
  },

  bioPage: {
    title: "Biografía",
    lead: "Pianista mexicano, concertista de Bellas Artes. En el escenario desde los nueve años, ha tocado en veintidós países de cuatro continentes, grabado más de treinta discos y estrenado en México obras que nadie había tocado aquí.",
    photoAlt: "Mauricio Nader de perfil, tocando un piano de cola ante el público.",
    trayectoria: "Trayectoria",
    datos: "Datos",
    prensa: "Prensa",
    prensaIntro: "Citas en su idioma original, tal como se publicaron.",
    close: {
      title: "¿Lo quieres en tu temporada?",
      text: "Escríbele para disponibilidad, honorarios o una versión corta de esta biografía para tu programa de mano.",
      cta: "Consultar disponibilidad",
      kit: "Pedir kit de prensa",
      programas: "Ver programas",
    },
  },

  footer: {
    tagline: "Pianista · Concertista de Bellas Artes",
    social: "Redes",
  },
};

export type Dictionary = typeof es;
