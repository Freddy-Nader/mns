import type { Txt } from "@/lib/i18n";

// The long biography at /bio. Every claim is sourced in docs/content/bio.md:
// his own site (/bio-press-notes), his 2026 CV (CV Masterclasses, PDF), and
// the INBA and press cross-checks done in September.
// ⚠️ The English is a draft for Mauricio to correct (ADR-0002).

/** Five short paragraphs, in the order a presenter reads a biography. */
export const trayectoria: Txt[] = [
  {
    es: "Mauricio Nader nació en la Ciudad de México en 1967. Empezó a tocar en público a los nueve años y a los diecinueve debutó en el Palacio de Bellas Artes como solista de la Orquesta Sinfónica Nacional. Se formó en el Conservatorio Nacional de Música, en la Universidad de Houston y en la Eastman School of Music, donde obtuvo la maestría en piano y recibió por unanimidad el Performer’s Certificate.",
    en: "Mauricio Nader was born in Mexico City in 1967. He began performing at the age of nine, and at nineteen made his debut at the Palacio de Bellas Artes as soloist with the National Symphony Orchestra. He trained at the Conservatorio Nacional de Música, the University of Houston and the Eastman School of Music, where he earned his master’s degree in piano and was unanimously awarded the Performer’s Certificate.",
  },
  {
    es: "Su carrera internacional arrancó en 1994, en las Semanas de Música de la Fundación Príncipe de Asturias, en España. Desde entonces ha tocado en veintidós países de cuatro continentes y ha llevado la música mexicana a escenarios como el Jay Pritzker Pavilion de Chicago, el Banco Interamericano de Desarrollo en Washington, Spivey Hall en Atlanta, la Americas Society de Nueva York, el Oslo Konserthus y el National Centre for the Performing Arts de Pekín.",
    en: "His international career began in 1994, at the Prince of Asturias Foundation’s music weeks in Spain. Since then he has played in twenty-two countries on four continents and brought Mexican music to stages such as Chicago’s Jay Pritzker Pavilion, the Inter-American Development Bank in Washington, Spivey Hall in Atlanta, the Americas Society in New York, the Oslo Konserthus and the National Centre for the Performing Arts in Beijing.",
  },
  {
    es: "Desde su debut es solista de las principales orquestas de México, y lo han invitado orquestas de Europa, Medio Oriente, Centroamérica y Sudamérica. Su repertorio va del barroco a la música contemporánea: estrenó en México los dos libros de Makrokosmos de George Crumb en el Festival Internacional Cervantino de 2009, y en varios países los conciertos para piano de Manuel M. Ponce y José Rolón.",
    en: "Since his debut he has been a soloist with Mexico’s major orchestras, and has been invited by orchestras in Europe, the Middle East, Central and South America. His repertoire runs from the Baroque to contemporary music: he gave the Mexican premiere of both books of George Crumb’s Makrokosmos at the 2009 Festival Internacional Cervantino, and premiered the piano concertos of Manuel M. Ponce and José Rolón in several countries.",
  },
  {
    es: "Es concertista del Instituto Nacional de Bellas Artes con el rango de Primer Concertino, y fue becario del FONCA como intérprete con trayectoria destacada. Da clases magistrales en México y en el extranjero, ha sido jurado de concursos como el Lang Lang–Telefónica y el Bartók-Kabalevsky, y desde 2006 es director académico y profesor de piano del Centro Mexicano de Posgrados en Música, en Puebla. Sus alumnos han ganado concursos y han seguido sus estudios en la Manhattan School of Music, la Universidad de Houston y los conservatorios de Milán, Santander, El Escorial y Róterdam.",
    en: "He is a member of the National Institute of Fine Arts’ group of concert soloists at the rank of Primer Concertino, and was a FONCA fellow as a performer with an outstanding career. He gives masterclasses in Mexico and abroad, has served on the juries of competitions such as the Lang Lang–Telefónica and the Bartók-Kabalevsky, and since 2006 has been academic director and piano professor at the Centro Mexicano de Posgrados en Música in Puebla. His students have won competitions and gone on to the Manhattan School of Music, the University of Houston and the conservatories of Milan, Santander, El Escorial and Rotterdam.",
  },
  {
    es: "Su trabajo está grabado en más de treinta discos, como solista, en música de cámara y como acompañante de voz. También compone y arregla: sus obras y transcripciones se han tocado en festivales de México, Inglaterra e Indonesia, y grabó la música de la película Güeros, de Alonso Ruizpalacios, y del documental El gesto eterno. En 2000 su fotografía apareció, junto a la de otros artistas mexicanos del siglo XX, en el timbre postal México del Siglo XX al Tercer Milenio / Arte.",
    en: "His work is recorded on more than thirty albums, as soloist, chamber musician and vocal accompanist. He also composes and arranges: his works and transcriptions have been performed at festivals in Mexico, England and Indonesia, and he recorded the music for Alonso Ruizpalacios’s film Güeros and the documentary El gesto eterno. In 2000 his photograph appeared, alongside other Mexican artists of the twentieth century, on the postage stamp México del Siglo XX al Tercer Milenio / Arte.",
  },
];

/** Label/value rows for scanning. Proper nouns stay as they are in both languages. */
export const datos: { label: Txt; items: Txt[] }[] = [
  {
    label: { es: "Formación", en: "Training" },
    items: [
      { es: "Conservatorio Nacional de Música, Ciudad de México", en: "Conservatorio Nacional de Música, Mexico City" },
      { es: "University of Houston, licenciatura", en: "University of Houston, BM" },
      {
        es: "Eastman School of Music, maestría y Performer’s Certificate",
        en: "Eastman School of Music, MM and Performer’s Certificate",
      },
      {
        es: "Piano con Carlos Bueno, María Teresa Rodríguez, Nancy Weems y Anton Nel",
        en: "Piano with Carlos Bueno, María Teresa Rodríguez, Nancy Weems and Anton Nel",
      },
      { es: "Composición con Samuel Adler y Brian Zoelch", en: "Composition with Samuel Adler and Brian Zoelch" },
    ],
  },
  {
    label: { es: "Premios", en: "Awards" },
    items: [
      {
        es: "Primer lugar, Concurso Internacional de Piano Bartók-Kabalevsky, EUA, 1996",
        en: "First prize, Bartók-Kabalevsky International Piano Competition, USA, 1996",
      },
      {
        es: "Medalla Conmemorativa del Milenio de Austria, 1996",
        en: "Commemorative Medal of the Austrian Millennium, 1996",
      },
      {
        es: "Primer lugar: Bienal de Piano (México), Concurso Nacional Edvard Grieg, Concurso Nacional de Xalapa, Texas Music Teachers’ Association, Tuesday Musical Club Young Artists Awards",
        en: "First prize: Bienal de Piano (Mexico), Edvard Grieg National Competition, Xalapa National Competition, Texas Music Teachers’ Association, Tuesday Musical Club Young Artists Awards",
      },
      {
        es: "Mención Most Distinguished, Ibla Grand Prize, Italia, 2008",
        en: "Most Distinguished mention, Ibla Grand Prize, Italy, 2008",
      },
      {
        es: "Becario del FONCA, intérpretes con trayectoria destacada",
        en: "FONCA fellow, performers with an outstanding career",
      },
    ],
  },
  {
    label: { es: "Orquestas", en: "Orchestras" },
    items: [
      {
        es: "Las principales orquestas de México, desde la Sinfónica Nacional",
        en: "Mexico’s major orchestras, starting with the National Symphony",
      },
      {
        es: "Filarmónica de Bogotá · Sinfónica Nacional del Líbano · Filarmónica del Líbano · Petrobras Sinfônica",
        en: "Bogotá Philharmonic · Lebanese National Symphony · Lebanese Philharmonic · Petrobras Sinfônica",
      },
      {
        es: "Sinfónicas de El Salvador, Panamá, Heredia, El Paso y Cuenca · Orquesta Municipal de Guayaquil",
        en: "Symphony orchestras of El Salvador, Panama, Heredia, El Paso and Cuenca · Guayaquil Municipal Orchestra",
      },
      {
        es: "Orquesta de Cámara Orfeo (Bulgaria) · Orquesta China de Instrumentos Tradicionales",
        en: "Orfeo Chamber Orchestra (Bulgaria) · Chinese Orchestra of Traditional Instruments",
      },
    ],
  },
  {
    label: { es: "Escenarios", en: "Venues" },
    items: [
      { es: "Palacio de Bellas Artes y Auditorio Nacional, Ciudad de México", en: "Palacio de Bellas Artes and Auditorio Nacional, Mexico City" },
      { es: "Jay Pritzker Pavilion y Art Institute of Chicago", en: "Jay Pritzker Pavilion and Art Institute of Chicago" },
      {
        es: "Banco Interamericano de Desarrollo, Washington · Spivey Hall, Atlanta · Americas Society, Nueva York",
        en: "Inter-American Development Bank, Washington · Spivey Hall, Atlanta · Americas Society, New York",
      },
      {
        es: "Oslo Konserthus · Hôtel National des Invalides, París · Centro Cultural de Belém, Lisboa",
        en: "Oslo Konserthus · Hôtel National des Invalides, Paris · Centro Cultural de Belém, Lisbon",
      },
      {
        es: "Teatro Municipal, Río de Janeiro · Teatro Sánchez Aguilar, Guayaquil · National Centre for the Performing Arts, Pekín",
        en: "Teatro Municipal, Rio de Janeiro · Teatro Sánchez Aguilar, Guayaquil · National Centre for the Performing Arts, Beijing",
      },
    ],
  },
  {
    label: { es: "Países", en: "Countries" },
    items: [
      {
        es: "México, Estados Unidos, Canadá, Alemania, Bulgaria, España, Francia, Italia, Noruega, Portugal, Belice, Brasil, Colombia, Costa Rica, Cuba, Ecuador, El Salvador, Panamá, Perú, Puerto Rico, China, Líbano y Pakistán",
        en: "Mexico, the United States, Canada, Germany, Bulgaria, Spain, France, Italy, Norway, Portugal, Belize, Brazil, Colombia, Costa Rica, Cuba, Ecuador, El Salvador, Panama, Peru, Puerto Rico, China, Lebanon and Pakistan",
      },
    ],
  },
  {
    label: { es: "Discos", en: "Recordings" },
    items: [
      {
        es: "Apuntes para piano — música mexicana de los siglos XX y XXI",
        en: "Apuntes para piano — Mexican music of the 20th and 21st centuries",
      },
      { es: "Mauricio Náder à Paris — música de las Américas", en: "Mauricio Náder à Paris — music of the Americas" },
      { es: "Piano Music — obras de Darián Stávans", en: "Piano Music — works by Darián Stávans" },
      { es: "Recital — Mozart, Schumann, Falla y Ligeti", en: "Recital — Mozart, Schumann, Falla and Ligeti" },
      {
        es: "Concierto para piano de Héctor Quintanar, con la Orquesta Sinfónica de la Universidad de Guanajuato y Juan Trigos",
        en: "Héctor Quintanar’s Piano Concerto, with the Guanajuato University Symphony Orchestra under Juan Trigos",
      },
      { es: "Bosque adentro", en: "Bosque adentro" },
    ],
  },
  {
    label: { es: "Cine y televisión", en: "Film and TV" },
    items: [
      { es: "Güeros, de Alonso Ruizpalacios", en: "Güeros, directed by Alonso Ruizpalacios" },
      { es: "El gesto eterno, documental de Javier Velázquez Cabrero", en: "El gesto eterno, documentary by Javier Velázquez Cabrero" },
      { es: "Piano para comerciales de televisión", en: "Piano for television commercials" },
    ],
  },
  {
    label: { es: "Jurado", en: "Juries" },
    items: [
      {
        es: "Concurso Internacional Lang Lang–Telefónica · Concurso Internacional de Piano Bartók-Kabalevsky (EUA)",
        en: "Lang Lang–Telefónica International Competition · Bartók-Kabalevsky International Piano Competition (USA)",
      },
      {
        es: "Concurso Internacional de Piano de Bucaramanga · Concurso Internacional de Piano Villahermosa",
        en: "Bucaramanga International Piano Competition · Villahermosa International Piano Competition",
      },
      {
        es: "Concurso Nacional de Piano Angélica Morales · Comisión de Evaluación del FONCA",
        en: "Angélica Morales National Piano Competition · FONCA evaluation committee",
      },
    ],
  },
  {
    label: { es: "Agrupaciones", en: "Ensembles" },
    items: [
      {
        es: "Ensamble 3 · The Composer’s Forum · Ensamble Ónix · Ensamble Cello Alterno",
        en: "Ensamble 3 · The Composer’s Forum · Ensamble Ónix · Ensamble Cello Alterno",
      },
    ],
  },
];
