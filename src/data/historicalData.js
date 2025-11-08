/**
 * Base de datos histórica ampliada - Cosiaca 350
 * Basada en investigación documental del archivo histórico de Medellín
 */

// Personajes históricos clave
export const historicalCharacters = {
  cosiaca: {
    name: "José García 'Cosiaca'",
    years: "1840-1900 (aprox.)",
    role: "Pícaro y cuentero popular",
    description: "Personaje real que vivía 'a costillas de los demás', famoso por su ingenio, humor ácido y crítica social. Primer comediante popular de Antioquia.",
    quotes: [
      "¡Yo vivo a costillas de los demás, pero con tanto ingenio que me quieren!",
      "Los ricos se ríen de mis chistes y me dan de comer. ¡Así de listo soy!",
      "Esta ciudad pasó de villa de mulas a metrópoli. ¡Qué viaje tan berraco!"
    ],
    legacy: "Símbolo del humor paisa, la picardía y la crítica social con gracia"
  },

  juanDelCorral: {
    name: "Juan del Corral",
    years: "1778-1814",
    role: "Prócer de la independencia",
    description: "Firmó la primera declaración de independencia absoluta de una provincia en América (1813). Otorgó a Medellín el título de ciudad.",
    achievements: [
      "Primera declaración de independencia absoluta en América",
      "Abolición de la esclavitud en Antioquia",
      "Elevación de Medellín a rango de ciudad"
    ],
    legacy: "Padre de la independencia antioqueña y visionario político"
  },

  pedroJustoBerrio: {
    name: "Pedro Justo Berrío",
    years: "1827-1875",
    role: "Gobernador y estadista",
    description: "Gobernador de Antioquia en el siglo XIX. Impulsó la educación, la infraestructura y el desarrollo económico de la región.",
    achievements: [
      "Construcción del Ferrocarril de Antioquia",
      "Fundación de instituciones educativas",
      "Modernización de Medellín"
    ],
    legacy: "Constructor del Antioquia moderno"
  },

  pedroNelGomez: {
    name: "Pedro Nel Gómez",
    years: "1899-1984",
    role: "Maestro de las artes plásticas",
    description: "Pintor, muralista, escultor y arquitecto. 'El Maestro' que revolucionó el arte paisa con sus murales monumentales.",
    achievements: [
      "Murales del Palacio Municipal de Medellín",
      "Fundación de la escuela de arte antioqueña",
      "Representación del pueblo trabajador en el arte"
    ],
    legacy: "Máximo exponente del arte paisa del siglo XX"
  },

  franciscoHerreraCampuzano: {
    name: "Francisco Herrera Campuzano",
    years: "1640-1695 (aprox.)",
    role: "Fundador de Medellín",
    description: "Fundó la Villa de Nuestra Señora de la Candelaria de Medellín el 2 de noviembre de 1675 con 24 familias españolas.",
    achievements: [
      "Fundación oficial de Medellín",
      "Establecimiento del cabildo",
      "Trazado urbano inicial"
    ],
    legacy: "Padre fundador de la ciudad"
  }
};

// Momentos históricos clave organizados por época
export const historicalMoments = {
  colonial: {
    period: "1616-1810",
    title: "Época Colonial",
    description: "Desde los pueblos indígenas hasta la fundación española y consolidación de la villa",
    events: [
      {
        year: 1616,
        title: "Poblado Indígena Aná",
        description: "Antes de la llegada española, el pueblo indígena Aná habitaba el Valle de Aburrá",
        importance: "Raíces ancestrales del territorio"
      },
      {
        year: 1675,
        title: "Fundación de Medellín",
        description: "Francisco Herrera Campuzano funda la villa con 24 familias españolas",
        importance: "Nacimiento oficial de la ciudad"
      },
      {
        year: 1803,
        title: "Colegio de Franciscanos",
        description: "Fundación del Colegio de Franciscanos, semilla de la Universidad de Antioquia",
        importance: "Primera educación formal"
      }
    ]
  },

  independencia: {
    period: "1810-1850",
    title: "Independencia y República",
    description: "Guerras de independencia, consolidación republicana y transformación social",
    events: [
      {
        year: 1813,
        title: "Declaración de Independencia",
        description: "Juan del Corral firma la primera declaración de independencia absoluta en América",
        importance: "Liderazgo revolucionario"
      },
      {
        year: 1826,
        title: "Capital de Antioquia",
        description: "Medellín es designada capital del departamento, desplazando a Santa Fe de Antioquia",
        importance: "Consolidación política"
      },
      {
        year: 1840,
        title: "Colonización Antioqueña",
        description: "Los paisas expanden el territorio hacia el sur, fundando nuevas poblaciones",
        importance: "Expansión territorial y económica"
      }
    ]
  },

  industrializacion: {
    period: "1850-1950",
    title: "Industrialización y Modernización",
    description: "Del café a las fábricas textiles, construcción del Manchester colombiano",
    events: [
      {
        year: 1875,
        title: "Ferrocarril de Antioquia",
        description: "Conexión con Puerto Berrío y el río Magdalena rompe el aislamiento geográfico",
        importance: "Integración con el país"
      },
      {
        year: 1890,
        title: "Bonanza Cafetera",
        description: "El café transforma la economía regional y genera grandes fortunas",
        importance: "Despegue económico"
      },
      {
        year: 1905,
        title: "Industria Textil",
        description: "Fundación de grandes textileras como Coltejer y Fabricato",
        importance: "Industrialización paisa"
      },
      {
        year: 1925,
        title: "Empresas Públicas de Medellín",
        description: "Creación de EPM para llevar servicios públicos a toda la ciudad",
        importance: "Modernización urbana"
      }
    ]
  },

  transformacion: {
    period: "1950-2000",
    title: "Expansión y Desafíos",
    description: "Crecimiento urbano acelerado, crisis de violencia y búsqueda de soluciones",
    events: [
      {
        year: 1955,
        title: "Tragedia de la Calle Junín",
        description: "Atentado con explosivos deja más de 1,000 víctimas",
        importance: "Dolor colectivo y resiliencia"
      },
      {
        year: 1995,
        title: "Inauguración del Metro",
        description: "Primer metro de Colombia transforma movilidad y cultura ciudadana",
        importance: "Orgullo paisa y cultura metro"
      }
    ]
  },

  innovacion: {
    period: "2000-2025",
    title: "Ciudad Innovadora",
    description: "De la ciudad más violenta a la más innovadora del mundo",
    events: [
      {
        year: 2004,
        title: "Metrocable",
        description: "Sistema de cable aéreo integra las comunas vulnerables",
        importance: "Innovación social mundial"
      },
      {
        year: 2007,
        title: "Parques Biblioteca",
        description: "Arquitectura de clase mundial en barrios populares",
        importance: "Transformación urbana y social"
      },
      {
        year: 2013,
        title: "Ciudad Más Innovadora",
        description: "Wall Street Journal premia a Medellín como City of the Year",
        importance: "Reconocimiento mundial"
      }
    ]
  }
};

// Datos culturales y tradiciones
export const culturalTraditions = {
  humor: {
    title: "Humor Paisa y Sátira Social",
    description: "Desde Cosiaca hasta hoy, el humor ha sido forma de crítica y expresión popular",
    examples: [
      "José García 'Cosiaca' - Primer comediante popular",
      "Periódico 'El Zancudo' - Prensa satírica del siglo XIX",
      "Humor costumbrista en radio y televisión"
    ]
  },

  arrieros: {
    title: "Cultura Arriera",
    description: "Los arrieros paisas construyeron caminos y llevaron progreso a lomo de mula",
    values: ["Tesón", "Honradez", "Trabajo duro", "Emprendimiento"],
    legacy: "Base del espíritu empresarial paisa"
  },

  caficultura: {
    title: "Tradición Cafetera",
    description: "El café no solo fue negocio, sino forma de vida y fuente de prosperidad",
    impact: "Generó riqueza económica y cultural que transformó la región"
  },

  silleteros: {
    title: "Desfile de Silleteros",
    description: "Tradición campesina convertida en símbolo mundial de Medellín",
    significance: "Patrimonio Cultural Inmaterial de la Nación desde 2013"
  }
};

// Hitos de infraestructura
export const infrastructureMilestones = [
  {
    name: "Ferrocarril de Antioquia",
    year: 1875,
    impact: "Rompió el aislamiento geográfico y conectó a Medellín con el mundo",
    cosiacaSays: "Del encierro de las montañas a los rieles del progreso"
  },
  {
    name: "Aeropuerto Olaya Herrera",
    year: 1932,
    impact: "Primer aeropuerto, conexión aérea con el país",
    cosiacaSays: "¡Del tren a las nubes! Ya no íbamos en mula sino volando"
  },
  {
    name: "Metro de Medellín",
    year: 1995,
    impact: "Primer metro de Colombia, símbolo de orgullo y cultura ciudadana",
    cosiacaSays: "El sueño más grande de los paisas hecho realidad sobre rieles"
  },
  {
    name: "Metrocable",
    year: 2004,
    impact: "Innovación mundial en transporte que integró comunidades marginadas",
    cosiacaSays: "El cable que nos subió la autoestima a todos"
  },
  {
    name: "Tranvía de Ayacucho",
    year: 2015,
    impact: "Sistema integrado de transporte que renovó el centro",
    cosiacaSays: "Ahora sí parecemos ciudad europea, con todo y tranvía"
  }
];

// Datos para generar contenido narrativo
export const narrativeThemes = {
  transformation: {
    title: "De Villa de Mulas a Ciudad Inteligente",
    arc: "350 años de transformación constante y resiliencia",
    milestones: [
      "Villa colonial (1675-1810)",
      "Ciudad republicana (1810-1850)",
      "Manchester colombiano (1850-1950)",
      "Metrópoli moderna (1950-2000)",
      "Ciudad innovadora (2000-2025)"
    ]
  },

  resilience: {
    title: "Caer y Levantarse",
    arc: "La historia de cómo Medellín superó adversidades",
    challenges: [
      "Aislamiento geográfico",
      "Guerras civiles del siglo XIX",
      "Violencia del narcoterrorismo",
      "Desigualdad social"
    ],
    responses: [
      "Construcción del ferrocarril",
      "Consolidación republicana",
      "Transformación urbana",
      "Innovación social"
    ]
  },

  identity: {
    title: "El Espíritu Paisa",
    characteristics: [
      "Verraquera y tesón",
      "Emprendimiento y comercio",
      "Educación y cultura",
      "Humor y picardía",
      "Solidaridad familiar"
    ],
    origins: "Mezcla de arrieros, comerciantes, campesinos e industriales"
  }
};

export default {
  historicalCharacters,
  historicalMoments,
  culturalTraditions,
  infrastructureMilestones,
  narrativeThemes
};
