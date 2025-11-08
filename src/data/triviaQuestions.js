// Base de datos de preguntas de trivia sobre los 350 años de Medellín
// Organizadas por períodos históricos y niveles de dificultad

export const triviaDatabase = {
  // NIVEL 1: PRINCIPIANTE (2000-2025) - Ciudad Innovadora
  beginner: [
    {
      id: 33,
      period: "2000-2010",
      difficulty: "Principiante",
      question: "¿En qué año Medellín fue declarada la ciudad más innovadora del mundo?",
      options: ["2012", "2013", "2014", "2015"],
      correctAnswer: "2013",
      feedback: "¡Extraordinario, mijito! En 2013, Medellín fue declarada la ciudad más innovadora del mundo por el Urban Land Institute. ¡De villa de mulas a ciudad inteligente, qué viaje tan berraco! ¿Sabés por qué ganamos ese premio? ¡Porque los paisas somos tan innovadores que hasta inventamos maneras nuevas de tomar café! Ja ja ja.",
      points: 30
    },
    {
      id: 34,
      period: "2000-2010",
      difficulty: "Principiante",
      question: "¿Cuál fue el primer proyecto de urbanismo social en Medellín?",
      options: ["Biblioteca España", "Parque Explora", "Orquideorama", "Proyecto Urbano Integral"],
      correctAnswer: "Proyecto Urbano Integral",
      feedback: "¡Perfecto, mijito! Los Proyectos Urbanos Integrales (PUI) fueron pioneros en urbanismo social, transformando barrios marginales en espacios dignos y hermosos. ¡Tan bonitos que quedaron que hasta los turistas se perdían admirando! ¿Sabés por qué funcionaron tan bien? ¡Porque los paisas somos expertos en hacer milagros con poquita plata! Ja ja ja.",
      points: 30
    },
    {
      id: 35,
      period: "2004-2015",
      difficulty: "Principiante",
      question: "¿En qué año se inauguró la primera línea del Metrocable?",
      options: ["2004", "2005", "2006", "2007"],
      correctAnswer: "2004",
      feedback: "¡Excelente, mijito! En 2004 se inauguró la Línea K del Metrocable, conectando los barrios de las laderas con el centro. ¡Una innovación mundial que nació en Medellín! Los paisas fuimos tan creativos que dijimos: 'Si no podemos bajar la montaña, subimos la gente por los aires'. ¿Sabés por qué el Metrocable es tan popular? ¡Porque es el único transporte donde podés ver toda la ciudad y llegar temprano al trabajo! Ja ja ja.",
      points: 30
    },
    {
      id: 36,
      period: "2006-2015",
      difficulty: "Principiante",
      question: "¿Quién fue el arquitecto del Parque Explora?",
      options: ["Alejandro Echeverri", "Giancarlo De Carlo", "Felipe Uribe", "Simón Vélez"],
      correctAnswer: "Alejandro Echeverri",
      feedback: "¡Correcto, mijito! Alejandro Echeverri diseñó el Parque Explora, un espacio que acerca la ciencia y la tecnología a todos los paisas, especialmente a los niños. ¡Tan bueno que quedó que hasta los adultos van a jugar! ¿Sabés por qué los paisas somos tan buenos para la ciencia? ¡Porque llevamos años experimentando con la arepa perfecta! Ja ja ja.",
      points: 30
    },
    {
      id: 37,
      period: "2010-2020",
      difficulty: "Principiante",
      question: "¿En qué año se inauguró el Tranvía de Ayacucho?",
      options: ["2015", "2016", "2017", "2018"],
      correctAnswer: "2015",
      feedback: "¡Perfecto, mijito! El Tranvía de Ayacucho se inauguró en 2015, conectando el centro con el oriente de la ciudad. ¡Otra innovación en transporte público paisa! Tan moderno que quedó que la gente se montaba solo para pasear. ¿Sabés por qué los paisas somos tan buenos para el transporte? ¡Porque llevamos siglos cargando bultos en mula y ahora cargamos gente en tranvía! Ja ja ja.",
      points: 30
    },
    {
      id: 38,
      period: "2010-2020",
      difficulty: "Principiante",
      question: "¿Cuál es el nombre del distrito de innovación de Medellín?",
      options: ["Distrito E", "Ruta N", "Medellín Digital", "Ciudad del Conocimiento"],
      correctAnswer: "Distrito E",
      feedback: "¡Excelente! El Distrito E (Distrito de la Economía del Conocimiento) es el corazón de la innovación paisa, donde convergen empresas, universidades y emprendedores.",
      points: 30
    },
    {
      id: 39,
      period: "2015-2025",
      difficulty: "Principiante",
      question: "¿En qué año se inauguró el Parque del Río?",
      options: ["2016", "2017", "2018", "2019"],
      correctAnswer: "2016",
      feedback: "¡Correcto! El Parque del Río se inauguró en 2016, devolviendo el río a los paisas y creando un espacio verde en el corazón de la ciudad.",
      points: 30
    },
    {
      id: 40,
      period: "2020-2025",
      difficulty: "Principiante",
      question: "¿Cuál es el nombre del proyecto de ciudad inteligente de Medellín?",
      options: ["MedellínTech", "Smart Medellín", "Medellín 4.0", "Ciudad Inteligente"],
      correctAnswer: "Medellín 4.0",
      feedback: "¡Extraordinario! Medellín 4.0 es la estrategia de ciudad inteligente que posiciona a Medellín como referente mundial en innovación urbana y tecnología.",
      points: 30
    }
  ],

  // NIVEL 2: INTERMEDIO (1950-2000) - Transformación Urbana
  intermediate: [
    {
      id: 25,
      period: "1950-1970",
      difficulty: "Intermedio",
      question: "¿En qué año se inauguró la Ciudad Universitaria de la Universidad de Antioquia?",
      options: ["1957", "1962", "1968", "1972"],
      correctAnswer: "1962",
      feedback: "¡Excelente conocimiento! En 1962 se inauguró la Ciudad Universitaria, un proyecto ambicioso que consolidó a la U de A como una de las mejores universidades del país.",
      points: 25
    },
    {
      id: 26,
      period: "1950-1970",
      difficulty: "Intermedio",
      question: "¿Cuál fue el primer centro comercial de Medellín?",
      options: ["Centro Comercial Oviedo", "Unicentro", "San Diego", "Monterrey"],
      correctAnswer: "Centro Comercial Oviedo",
      feedback: "¡Perfecto! El Centro Comercial Oviedo fue el pionero en 1974, cambiando para siempre la forma de hacer compras en la ciudad. ¡Una revolución comercial paisa!",
      points: 25
    },
    {
      id: 27,
      period: "1970-1990",
      difficulty: "Intermedio",
      question: "¿En qué año comenzó la construcción del Metro de Medellín?",
      options: ["1979", "1984", "1987", "1990"],
      correctAnswer: "1984",
      feedback: "¡Correcto! En 1984 comenzó la construcción del Metro, el sueño más grande de los paisas. Once años después, en 1995, se inauguró este orgullo de la ingeniería colombiana.",
      points: 25
    },
    {
      id: 28,
      period: "1970-1990",
      difficulty: "Intermedio",
      question: "¿Quién fue el alcalde que impulsó el proyecto del Metro?",
      options: ["William Jaramillo", "Juan Gómez Martínez", "Omar Flórez", "Álvaro Uribe Vélez"],
      correctAnswer: "Juan Gómez Martínez",
      feedback: "¡Excelente! Juan Gómez Martínez fue el visionario que impulsó el Metro cuando muchos decían que era imposible. ¡Un verdadero líder paisa con visión de futuro!",
      points: 25
    },
    {
      id: 29,
      period: "1980-2000",
      difficulty: "Intermedio",
      question: "¿En qué año se fundó el Museo de Antioquia?",
      options: ["1881", "1922", "1955", "1978"],
      correctAnswer: "1881",
      feedback: "¡Increíble conocimiento! El Museo de Antioquia se fundó en 1881, siendo uno de los museos más antiguos de Colombia. ¡Más de 140 años preservando nuestra cultura!",
      points: 25
    },
    {
      id: 30,
      period: "1990-2000",
      difficulty: "Intermedio",
      question: "¿Cuál fue el primer alcalde elegido por voto popular en Medellín?",
      options: ["William Jaramillo", "Juan Gómez Martínez", "Omar Flórez", "Álvaro Uribe Vélez"],
      correctAnswer: "William Jaramillo",
      feedback: "¡Perfecto! William Jaramillo fue el primer alcalde elegido por voto popular en 1988, marcando una nueva era democrática en la ciudad.",
      points: 25
    },
    {
      id: 31,
      period: "1990-2000",
      difficulty: "Intermedio",
      question: "¿En qué año se inauguró el Planetario de Medellín?",
      options: ["1984", "1989", "1993", "1997"],
      correctAnswer: "1984",
      feedback: "¡Correcto! El Planetario se inauguró en 1984, acercando las estrellas a los paisas y fomentando el amor por la ciencia y la astronomía.",
      points: 25
    },
    {
      id: 32,
      period: "1990-2000",
      difficulty: "Intermedio",
      question: "¿Cuál fue el primer festival internacional que se realizó en Medellín?",
      options: ["Festival de Poesía", "Festival de Tango", "Festival de Jazz", "Festival de Teatro"],
      correctAnswer: "Festival de Poesía",
      feedback: "¡Excelente! El Festival Internacional de Poesía comenzó en 1991, convirtiendo a Medellín en la capital mundial de la poesía. ¡Qué orgullo paisa!",
      points: 25
    }
  ],

  // NIVEL 3: AVANZADO (1900-1950) - Industrialización (se mantiene igual)
  advanced: [
    {
      id: 17,
      period: "1900-1920",
      difficulty: "Avanzado",
      question: "¿Quién fue el arquitecto del Teatro Junín?",
      options: ["Agustín Goovaerts", "Carlos Carré", "Julián Lombana", "Nel Rodríguez"],
      correctAnswer: "Agustín Goovaerts",
      feedback: "¡Excelente! Agustín Goovaerts, arquitecto belga, diseñó el Teatro Junín en 1924. Un teatro que se convirtió en el corazón cultural de la ciudad, donde se presentaban las mejores obras.",
      points: 20
    },
    {
      id: 18,
      period: "1900-1920",
      difficulty: "Avanzado",
      question: "¿En qué año se fundó el Banco de Antioquia?",
      options: ["1901", "1905", "1912", "1918"],
      correctAnswer: "1905",
      feedback: "¡Correcto! El Banco de Antioquia se fundó en 1905, consolidando el poder económico paisa. Los empresarios antioqueños ya mostraban esa visión de futuro que los caracteriza.",
      points: 20
    },
    {
      id: 19,
      period: "1920-1940",
      difficulty: "Avanzado",
      question: "¿Cuál fue el primer barrio planificado de Medellín?",
      options: ["El Poblado", "Laureles", "La América", "Prado"],
      correctAnswer: "Prado",
      feedback: "¡Muy bien! El barrio Prado fue el primer barrio planificado de Medellín en los años 20. Un barrio elegante donde vivía la élite paisa de la época.",
      points: 20
    },
    {
      id: 20,
      period: "1920-1940",
      difficulty: "Avanzado",
      question: "¿Quién fue conocido como 'El Maestro' en la pintura antioqueña?",
      options: ["Francisco Antonio Cano", "Pedro Nel Gómez", "Eladio Vélez", "Marco Tobón Mejía"],
      correctAnswer: "Pedro Nel Gómez",
      feedback: "¡Exacto! Pedro Nel Gómez, 'El Maestro', revolucionó el arte paisa con sus murales y pinturas. Sus obras en el Palacio Municipal son un tesoro de la ciudad.",
      points: 20
    },
    {
      id: 21,
      period: "1930-1950",
      difficulty: "Avanzado",
      question: "¿En qué año se inauguró el Aeropuerto Olaya Herrera?",
      options: ["1932", "1936", "1940", "1945"],
      correctAnswer: "1932",
      feedback: "¡Correcto! En 1932 se inauguró el Aeropuerto Olaya Herrera, conectando a Medellín con el mundo. ¡Los paisas ya pensaban en grande desde esa época!",
      points: 20
    },
    {
      id: 22,
      period: "1930-1950",
      difficulty: "Avanzado",
      question: "¿Cuál fue la primera emisora de radio de Medellín?",
      options: ["La Voz de Antioquia", "Radio Nutibara", "Emisora Cultural", "Radio Medellín"],
      correctAnswer: "La Voz de Antioquia",
      feedback: "¡Así es! La Voz de Antioquia fue la primera emisora en 1929. Desde ahí se empezó a escuchar la música paisa y las noticias de la región por todo el valle.",
      points: 20
    },
    {
      id: 23,
      period: "1940-1950",
      difficulty: "Avanzado",
      question: "¿Quién fue el alcalde que más tiempo gobernó Medellín en el siglo XX?",
      options: ["Luis Peláez Restrepo", "Jorge Restrepo Uribe", "Pablo Tobón Uribe", "Tulio Ospina"],
      correctAnswer: "Luis Peláez Restrepo",
      feedback: "¡Excelente! Luis Peláez Restrepo fue alcalde por varios períodos y dejó una huella imborrable en el desarrollo urbano de la ciudad. Un visionario del progreso paisa.",
      points: 20
    },
    {
      id: 24,
      period: "1940-1950",
      difficulty: "Avanzado",
      question: "¿En qué año se creó la Orquesta Sinfónica de Antioquia?",
      options: ["1942", "1947", "1951", "1955"],
      correctAnswer: "1947",
      feedback: "¡Correcto! En 1947 se fundó la Orquesta Sinfónica de Antioquia, elevando el nivel cultural de la ciudad. La música clásica también encontró su lugar en el corazón paisa.",
      points: 20
    }
  ],

  // NIVEL 4: EXPERTO (1800-1900) - Independencia y República
  expert: [
    {
      id: 9,
      period: "1800-1850",
      difficulty: "Experto",
      question: "¿En qué año Medellín obtuvo el título de ciudad?",
      options: ["1813", "1826", "1835", "1842"],
      correctAnswer: "1813",
      feedback: "¡Muy bien! En 1813, durante las guerras de independencia, Medellín recibió el título de ciudad. Ya no era una simple villa, ¡era una ciudad hecha y derecha!",
      points: 15
    },
    {
      id: 10,
      period: "1800-1850",
      difficulty: "Experto",
      question: "¿Quién fue el primer alcalde de Medellín como ciudad?",
      options: ["José María Córdoba", "Francisco Antonio Zea", "Juan del Corral", "José Félix de Restrepo"],
      correctAnswer: "Juan del Corral",
      feedback: "¡Exacto! Juan del Corral fue el primer alcalde cuando Medellín se convirtió en ciudad. Un hombre ilustrado que ayudó a sentar las bases de lo que somos hoy.",
      points: 15
    },
    {
      id: 11,
      period: "1850-1900",
      difficulty: "Experto",
      question: "¿En qué década comenzó el auge del café en Antioquia?",
      options: ["1850s", "1860s", "1870s", "1880s"],
      correctAnswer: "1870s",
      feedback: "¡Correcto! En los años 1870 empezó la bonanza cafetera que nos hizo ricos en plata y en cultura. El grano dorado que cambió la historia paisa para siempre.",
      points: 15
    },
    {
      id: 12,
      period: "1850-1900",
      difficulty: "Experto",
      question: "¿Cuál fue la primera empresa textil importante de Medellín?",
      options: ["Coltejer", "Fabricato", "Tejicóndor", "Compañía Colombiana de Tejidos"],
      correctAnswer: "Compañía Colombiana de Tejidos",
      feedback: "¡Así es! La Compañía Colombiana de Tejidos fue la pionera. Después vinieron Coltejer y Fabricato, pero esta fue la que abrió el camino de la industria textil paisa.",
      points: 15
    },
    {
      id: 13,
      period: "1850-1900",
      difficulty: "Experto",
      question: "¿En qué año se fundó la Universidad de Antioquia?",
      options: ["1803", "1822", "1871", "1886"],
      correctAnswer: "1803",
      feedback: "¡Muy bien! En 1803 se fundó como Colegio de Franciscanos, y después se convirtió en la Universidad de Antioquia. ¡Más de 200 años formando mentes brillantes!",
      points: 15
    },
    {
      id: 14,
      period: "1880-1900",
      difficulty: "Experto",
      question: "¿Cuál era el apodo de José García 'Cosiaca'?",
      options: ["El Cuentero", "El Pícaro", "El que vive a costillas de los demás", "El Trovador"],
      correctAnswer: "El que vive a costillas de los demás",
      feedback: "¡Exacto! Cosiaca era famoso por vivir a costillas de los demás, pero con tanto ingenio y gracia que la gente lo quería. ¡El primer comediante popular de Antioquia!",
      points: 15
    },
    {
      id: 15,
      period: "1880-1900",
      difficulty: "Experto",
      question: "¿En qué año se inauguró el primer tranvía de Medellín?",
      options: ["1885", "1890", "1895", "1900"],
      correctAnswer: "1890",
      feedback: "¡Correcto! En 1890 se inauguró el tranvía de mulas. ¡Imagínese, las mulas jalando carros por toda la ciudad! Los pasajeros se quejaban del olor, pero nunca se quedaron sin gasolina, ja ja ja.",
      points: 15
    },
    {
      id: 16,
      period: "1880-1900",
      difficulty: "Experto",
      question: "¿Cuál fue el primer periódico de Medellín?",
      options: ["El Colombiano", "El Espectador Antioqueño", "La Miscelánea", "El Zancudo"],
      correctAnswer: "El Espectador Antioqueño",
      feedback: "¡Así es! El Espectador Antioqueño fue el primer periódico en 1887. Después vino El Zancudo con su humor satírico, ¡el antecedente del humor paisa moderno!",
      points: 15
    }
  ],

  // NIVEL 5: MAESTRO (1675-1800) - Época Colonial
  master: [
    {
      id: 1,
      period: "1616",
      difficulty: "Maestro",
      question: "¿Qué pueblo indígena habitaba el Valle de Aburrá antes de la llegada española?",
      options: ["Aná", "Nutabe", "Tahamí", "Guaca"],
      correctAnswer: "Aná",
      feedback: "¡Eso es, mijito! Los indígenas Aná fueron los primeros habitantes del Valle de Aburrá. Cultivaban maíz, yuca y comerciaban con otras tribus. Antes de los españoles, esta tierra ya tenía dueños verracos que sabían trabajarla con respeto.",
      points: 10
    },
    {
      id: 2,
      period: "1675-1700",
      difficulty: "Maestro",
      question: "¿En qué año se fundó oficialmente Medellín?",
      options: ["1675", "1674", "1676", "1680"],
      correctAnswer: "1675",
      feedback: "¡Exacto, mijito! El 2 de noviembre de 1675, Francisco Herrera Campuzano fundó la Villa de Nuestra Señora de la Candelaria de Medellín. ¡Ahí empezó todo este cuento paisa!",
      points: 10
    },
    {
      id: 3,
      period: "1675-1700",
      difficulty: "Maestro",
      question: "¿Cuál era el nombre completo original de Medellín?",
      options: ["Villa de la Candelaria", "Villa de Nuestra Señora de la Candelaria de Medellín", "Villa de Medellín", "Villa de Antioquia"],
      correctAnswer: "Villa de Nuestra Señora de la Candelaria de Medellín",
      feedback: "¡Eso es! Un nombre larguísimo para una villa pequeñita. Los fundadores eran muy devotos de la Virgen de la Candelaria, por eso le pusieron ese nombre tan elegante.",
      points: 10
    },
    {
      id: 4,
      period: "1675-1700",
      difficulty: "Maestro",
      question: "¿Quién fue el fundador de Medellín?",
      options: ["Francisco Herrera Campuzano", "Pedro de Heredia", "Gonzalo Jiménez de Quesada", "Sebastián de Belalcázar"],
      correctAnswer: "Francisco Herrera Campuzano",
      feedback: "¡Correcto! Don Francisco Herrera Campuzano fue el verraco que se aventuró a fundar esta villa. Un hombre con visión, ¡aunque no se imaginaba que iba a crear la cuna de tanto paisa trabajador!",
      points: 10
    },
    {
      id: 4,
      period: "1675-1700",
      difficulty: "Maestro",
      question: "¿Cuántas familias fundadoras llegaron inicialmente a Medellín?",
      options: ["20", "24", "30", "35"],
      correctAnswer: "24",
      feedback: "¡Así es! Llegaron 24 familias valientes, pero había más vacas que gente, ja ja ja. Por eso es que los paisas heredamos esa terquedad bovina, ¡pero también la nobleza!",
      points: 10
    },
    {
      id: 5,
      period: "1700-1750",
      difficulty: "Maestro",
      question: "¿En qué valle se estableció Medellín?",
      options: ["Valle de Aburrá", "Valle de Urabá", "Valle del Cauca", "Valle de Tenza"],
      correctAnswer: "Valle de Aburrá",
      feedback: "¡Claro que sí! El Valle de Aburrá, rodeado de montañas verdes y con un río que lo atraviesa. Un lugar perfecto para que floreciera la cultura paisa.",
      points: 10
    },
    {
      id: 6,
      period: "1700-1750",
      difficulty: "Maestro",
      question: "¿Cuál era la principal actividad económica en los primeros años de Medellín?",
      options: ["Minería", "Agricultura y ganadería", "Comercio", "Artesanías"],
      correctAnswer: "Agricultura y ganadería",
      feedback: "¡Exacto! Los primeros paisas eran agricultores y ganaderos. Sembraban maíz, fríjol y criaban ganado. De ahí viene esa tradición paisa de trabajar la tierra con amor.",
      points: 10
    },
    {
      id: 7,
      period: "1750-1800",
      difficulty: "Maestro",
      question: "¿Cómo se llamaba originalmente el Parque Berrío?",
      options: ["Plaza Mayor", "Plaza de la Villa de la Candelaria", "Plaza Central", "Plaza de Armas"],
      correctAnswer: "Plaza de la Villa de la Candelaria",
      feedback: "¡Eso es! La Plaza de la Villa de la Candelaria era el corazón de todo. Ahí se hacían los negocios, las misas y hasta las peleas de gallos. ¡El ombligo del pueblo!",
      points: 10
    },
    {
      id: 8,
      period: "1750-1800",
      difficulty: "Maestro",
      question: "¿Qué río atraviesa el Valle de Aburrá?",
      options: ["Río Medellín", "Río Cauca", "Río Magdalena", "Río Atrato"],
      correctAnswer: "Río Medellín",
      feedback: "¡Correcto! El Río Medellín, que antes se llamaba Río Aburrá. Nuestro río querido que ha visto pasar toda la historia de la ciudad.",
      points: 10
    }
  ]
};

// Configuración de niveles y progresión
export const levelConfig = {
  beginner: {
    name: "Principiante", 
    description: "Ciudad Innovadora (2000-2025)",
    questionsToPass: 6,
    totalQuestions: 8,
    pointsPerQuestion: 10,
    color: "bg-green-500"
  },
  intermediate: {
    name: "Intermedio", 
    description: "Transformación Urbana (1950-2000)",
    questionsToPass: 6,
    totalQuestions: 8,
    pointsPerQuestion: 15,
    color: "bg-blue-500"
  },
  advanced: {
    name: "Avanzado",
    description: "Industrialización (1900-1950)",
    questionsToPass: 6,
    totalQuestions: 8,
    pointsPerQuestion: 20,
    color: "bg-purple-500"
  },
  expert: {
    name: "Experto",
    description: "Independencia y República (1800-1900)",
    questionsToPass: 6,
    totalQuestions: 8,
    pointsPerQuestion: 25,
    color: "bg-red-500"
  },
  master: {
    name: "Maestro",
    description: "Época Colonial (1675-1800)",
    questionsToPass: 6,
    totalQuestions: 8,
    pointsPerQuestion: 30,
    color: "bg-yellow-500"
  }
};

// Función para obtener preguntas aleatorias de un nivel
export const getRandomQuestions = (level, count = 8) => {
  const questions = triviaDatabase[level] || [];
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Función para calcular el puntaje total posible
export const calculateMaxScore = () => {
  let maxScore = 0;
  Object.keys(levelConfig).forEach(level => {
    const config = levelConfig[level];
    maxScore += config.totalQuestions * config.pointsPerQuestion;
  });
  return maxScore;
};

// Datos adicionales para generar más preguntas con IA
export const historicalPeriods = {
  "1675-1700": {
    events: ["Fundación de Medellín", "Primeras familias", "Establecimiento de la villa"],
    characters: ["Francisco Herrera Campuzano", "Primeros colonos"],
    context: "Época de fundación y establecimiento colonial"
  },
  "1700-1800": {
    events: ["Desarrollo colonial", "Crecimiento poblacional", "Establecimiento de tradiciones"],
    characters: ["Autoridades coloniales", "Primeros comerciantes"],
    context: "Consolidación de la villa colonial"
  },
  "1800-1850": {
    events: ["Independencia", "Guerras civiles", "Establecimiento republicano"],
    characters: ["Juan del Corral", "José Félix de Restrepo", "Próceres antioqueños"],
    context: "Transición de colonia a república"
  },
  "1850-1900": {
    events: ["Auge cafetero", "Industrialización temprana", "Desarrollo urbano"],
    characters: ["José García Cosiaca", "Empresarios textileros", "Arrieros"],
    context: "Transformación económica y social"
  },
  "1900-1950": {
    events: ["Industrialización", "Modernización urbana", "Desarrollo cultural"],
    characters: ["Pedro Nel Gómez", "Industriales paisas", "Arquitectos"],
    context: "Medellín como Manchester colombiano"
  },
  "1950-2000": {
    events: ["Expansión urbana", "Crisis social", "Transformación"],
    characters: ["Alcaldes visionarios", "Líderes sociales", "Arquitectos urbanos"],
    context: "Crecimiento y desafíos urbanos"
  },
  "2000-2025": {
    events: ["Innovación urbana", "Reconocimiento mundial", "Ciudad inteligente"],
    characters: ["Alcaldes innovadores", "Arquitectos urbanos", "Líderes tecnológicos"],
    context: "Medellín como referente mundial"
  }
};