import type { Dictionary } from "./es";

// ⚠️ Draft. The interface strings and enums are fine to ship; the free-text
// paragraphs (bio, section intros) need Mauricio's own English (ADR-0002).

export const en: Dictionary = {
  intl: "en-US",

  meta: {
    title: "Mauricio Nader — Pianist",
    description:
      "Mexican concert pianist, Bellas Artes soloist. Upcoming dates, programmes to book, lessons, scores and commissioned arrangements.",
    fechasTitle: "Dates — Mauricio Nader",
    fechasDescription:
      "Every published date for Mauricio Nader: recitals, concerts with orchestra and masterclasses.",
  },

  nav: {
    label: "Main",
    fechas: "Dates",
    programas: "Programmes",
    clases: "Lessons",
    partituras: "Scores",
    contacto: "Contact",
    open: "Open menu",
    close: "Close menu",
    lang: "Language",
  },

  segmentos: { asistir: "Attend", aprender: "Learn", contratar: "Book" },

  links: {
    proximasFechas: "Upcoming dates",
    todasLasFechas: "All dates",
    programas: "Programmes",
    programasDisponibles: "Available programmes",
    escucha: "Watch & listen",
    clasesParticulares: "Private lessons",
    masterclasses: "Masterclasses",
    curso: "Music course",
    partituras: "Scores",
    contratacion: "Booking",
    encargos: "Commissions & arrangements",
    kit: "Press kit",
    bio: "Bio",
    prensa: "Press",
    youtube: "YouTube",
    contacto: "Contact",
  },

  hero: {
    eyebrow: "Pianist · Bellas Artes Soloist",
    line: "From the Baroque to the movies, in twenty-two countries and more than thirty albums.",
    fechas: "Upcoming dates",
    contacto: "Get in touch",
    photoAlt: "Mauricio Nader portrayed inside the open lid of a grand piano.",
  },

  prensa: { label: "Press" },

  puertas: {
    label: "What you can do here",
    asistir: {
      title: "Hear him live",
      next: "Next date",
      none: "See the full calendar.",
      cta: "See dates",
    },
    aprender: {
      title: "Learn with him",
      text: "Private lessons, masterclasses and a music course, for students, professionals and amateurs.",
      cta: "See lessons",
    },
    contratar: {
      title: "Bring him to your stage",
      text: "{n} named programmes and 28 concertos with orchestra, ready for your season.",
      cta: "See programmes",
    },
  },

  fechas: {
    title: "Upcoming dates",
    pageTitle: "Dates",
    pageIntro: "Every published date, from the nearest to the furthest.",
    and: "and",
    of: "",
    all: "See all dates",
    empty: "No dates are published right now.",
    noTime: "Time to be confirmed",
    online: "Online",
    acceso: {
      "entrada-libre": "Free admission",
      boletos: "Tickets",
      taquilla: "Box office",
      inscripcion: "Registration",
      "por-confirmar": "Admission to be confirmed",
    },
    buy: "Buy tickets",
    enrol: "Register",
    directions: "Directions",
  },

  escucha: {
    title: "Watch & listen",
    intro: "His concerts and his arrangements, on video.",
    channel: "See all {n} videos on YouTube",
    play: "Play",
    playing: "Now playing",
    more: "More videos",
    score: "Score",
  },

  programas: {
    title: "Programmes",
    intro: "Complete concerts with a name and a fixed repertoire, ready for your season.",
    featured: "His most active programme · {n} dates in {year}",
    upcoming: "Upcoming dates for this programme",
    request: "Request this programme",
    requestShort: "Request",
    formato: {
      recital: "Recital",
      orquesta: "With orchestra",
      charla: "Concert & talk",
    },
    photoAlt: "Mauricio Nader at a Piano de Película recital, seen from the audience.",
    booking: {
      title: "Programming a season?",
      text: "Write for availability, fees and press material: biography, photographs and concerto repertoire.",
      emergency:
        "Available for emergency replacements: he prepares concerts, recordings and courses at short notice when another soloist cancels.",
      cta: "Check availability",
      kit: "Request the press kit",
      stats: [
        { n: "22", l: "countries" },
        { n: "30+", l: "albums" },
        { n: "800+", l: "performances" },
        { n: "28", l: "concertos with orchestra" },
      ],
    },
  },

  bio: {
    label: "About Mauricio Nader",
    paragraphs: [
      "He began playing at nine and at nineteen made his solo debut with the National Symphony Orchestra at the Palacio de Bellas Artes. He studied at the National Conservatory, in Houston and at Eastman, where he was unanimously awarded the Performer’s Certificate.",
      "Today he is a Bellas Artes soloist at the rank of concertino. He has played in twenty-two countries, recorded more than thirty albums and gave the Mexican premiere of George Crumb’s Makrokosmos. He teaches private lessons, gives masterclasses and writes arrangements on commission.",
    ],
    cta: "Request the full biography",
    photoA: "Mauricio Nader in profile, playing a grand piano before an audience.",
    photoB: "Mauricio Nader in recital at the Casona de Xicoténcatl, seen from the audience.",
  },

  clases: {
    title: "Lessons",
    intro:
      "For anyone preparing a competition or an audition, and for anyone coming back to the piano after years away. You start from your own level.",
    particulares: {
      label: "Private lessons",
      title: "Piano and chamber music",
      rows: [
        ["For", "Students, professionals and amateurs"],
        ["Format", "One to one"],
        ["First step", "A message with your level and what you want to play"],
      ],
      cta: "Message on WhatsApp",
      message: "Hello Mauricio, I’m interested in taking piano lessons with you.",
    },
    masterclasses: {
      label: "Masterclasses",
      title: "For schools, festivals and conservatories",
      rows: [
        ["For", "Students and professionals at every level"],
        ["Disciplines", "Piano and chamber music"],
      ],
      next: "Next",
      cta: "Host a masterclass",
    },
    curso: {
      label: "Music course",
      title: "Piano, chamber music, voice & piano",
      rows: [
        ["Call", "Rules and registration online"],
        ["Enquiries", "curso.musika@gmail.com"],
      ],
      cta: "Rules and registration",
    },
    proof:
      "His students have won national and international competitions and gone on to the Manhattan School of Music, the University of Houston, the Giuseppe Verdi Conservatory in Milan and the Rotterdam Conservatory.",
    position:
      "Since 2006 he has been academic director and piano professor at the Centro Mexicano de Posgrados en Música in Puebla.",
  },

  partituras: {
    title: "Scores",
    intro:
      "His arrangements, transcriptions and original works, as PDFs. Before you buy, hear him play them.",
    tipo: {
      arreglo: "Arrangement",
      transcripcion: "Transcription",
      original: "Original work",
    },
    listen: "Listen",
    buy: "Buy",
    store: "See all {n} in the store",
    note: "Payment and download in his online store, Lemon Squeezy.",
  },

  encargos: {
    title: "Commissions",
    intro:
      "Arrangements, transcriptions and new works, written for your project. It is the craft behind his scores: Moncayo’s Huapango, Rhapsody in Blue, El amor brujo.",
    film: "He also records piano for film and television: Alonso Ruizpalacios’s Güeros is one of those films.",
    price:
      "The fee depends on length, instrumentation and delivery date. First a conversation, then a quote.",
    form: {
      label: "Tell him about your project",
      que: {
        label: "What do you need?",
        options: ["Arrangement", "Transcription", "New work", "Recording", "Other"],
      },
      para: {
        label: "What is it for?",
        options: ["Concert", "Wedding or event", "Album or video", "Film or advertising", "Personal study"],
      },
      instrumentos: {
        label: "For which instruments?",
        options: ["Solo piano", "Piano four hands", "Voice and piano", "Chamber ensemble", "Orchestra"],
      },
      cuando: {
        label: "By when?",
        options: ["Under a month", "One to three months", "Over three months", "No fixed date"],
      },
      detalles: { label: "Tell him more", placeholder: "The piece, its length, who will play it…" },
      nombre: { label: "Your name", placeholder: "First and last name" },
      optional: "optional",
      whatsapp: "Send on WhatsApp",
      email: "Send by email",
      privacy: "The message opens in your WhatsApp or your email, ready to send. This site stores nothing.",
      message: {
        greeting: "Hello Mauricio, I’m writing about a commission.",
        que: "What",
        para: "For",
        instrumentos: "Instruments",
        cuando: "By when",
        detalles: "Details",
        subject: "Commission",
      },
    },
  },

  contacto: {
    title: "Contact",
    quote: "Thank you for visiting my page. I am always available.",
    contratacion: {
      label: "Booking",
      text: "Concerts, recitals, festivals, orchestras and institutions.",
      cta: "Booking form",
    },
    clases: {
      label: "Lessons & course",
      text: "Private lessons, masterclasses and the music course.",
      cta: "WhatsApp",
    },
    encargos: {
      label: "Commissions",
      text: "Arrangements, transcriptions, new works and recordings.",
      cta: "Describe my project",
    },
    prensa: {
      label: "Press",
      text: "Interviews, photographs and the press kit.",
      cta: "Write to press",
      subject: "Press",
    },
    direct: "Direct line",
    city: "Mexico City",
    subjects: {
      contratacion: "Booking",
      kit: "Press kit",
      bio: "Full biography",
      programa: "Programme",
      masterclass: "Masterclass",
    },
  },

  footer: {
    tagline: "Pianist · Bellas Artes Soloist",
    social: "Social",
  },
};
