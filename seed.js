require('dotenv').config();
const mongoose = require('mongoose');

// Importación de modelos
const Genero = require('./src/models/genero.model');
const Director = require('./src/models/director.model');
const Productora = require('./src/models/productora.model');
const Tipo = require('./src/models/tipo.model');
const Media = require('./src/models/media.model');

// Datos base de entidades secundarias
const generosBase = [
  { nombre: 'Acción', estado: 'Activo', descripcion: 'Películas de alta adrenalina y combate' },
  { nombre: 'Ciencia Ficción', estado: 'Activo', descripcion: 'Futurismo, espacio y tecnología' },
  { nombre: 'Drama', estado: 'Activo', descripcion: 'Historias intensas y emocionales' },
  { nombre: 'Comedia', estado: 'Activo', descripcion: 'Humor y situaciones divertidas' },
  { nombre: 'Aventura', estado: 'Activo', descripcion: 'Viajes, hallazgos y exploración' },
  { nombre: 'Terror', estado: 'Activo', descripcion: 'Suspenso, miedo y fenómenos oscuros' },
  { nombre: 'Animación', estado: 'Activo', descripcion: 'Cine animado para todas las edades' },
  { nombre: 'Thriller', estado: 'Activo', descripcion: 'Intriga y tensión psicológica' }
];

const directoresBase = [
  { nombres: 'Christopher Nolan', estado: 'Activo' },
  { nombres: 'Steven Spielberg', estado: 'Activo' },
  { nombres: 'Quentin Tarantino', estado: 'Activo' },
  { nombres: 'Martin Scorsese', estado: 'Activo' },
  { nombres: 'Denis Villeneuve', estado: 'Activo' },
  { nombres: 'James Cameron', estado: 'Activo' },
  { nombres: 'David Fincher', estado: 'Activo' },
  { nombres: 'Guillermo del Toro', estado: 'Activo' },
  { nombres: 'Greta Gerwig', estado: 'Activo' },
  { nombres: 'Hayao Miyazaki', estado: 'Activo' }
];

const productorasBase = [
  { nombre: 'Warner Bros', estado: 'Activo', slogan: 'Entertainment' },
  { nombre: 'Universal Pictures', estado: 'Activo', slogan: 'A Comcast Company' },
  { nombre: 'Paramount Pictures', estado: 'Activo', slogan: 'A ViacomCBS Company' },
  { nombre: '20th Century Studios', estado: 'Activo', slogan: 'A Walt Disney Company' },
  { nombre: 'Sony Pictures', estado: 'Activo', slogan: 'Make.Believe' },
  { nombre: 'Walt Disney Pictures', estado: 'Activo', slogan: 'Where Dreams Come True' },
  { nombre: 'A24', estado: 'Activo', slogan: 'Indie Excellence' },
  { nombre: 'Netflix Studios', estado: 'Activo', slogan: 'See What Next' }
];

const tiposBase = [
  { nombre: 'Película', descripcion: 'Largometraje cinematográfico' },
  { nombre: 'Serie', descripcion: 'Serie de televisión o plataforma' }
];

// Catálogo de 100 Películas Reales
const peliculasReales = [
  { titulo: 'Inception', ano: 2010, gen: 'Ciencia Ficción', dir: 'Christopher Nolan', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', sin: 'Un ladrón que roba secretos a través de los sueños.' },
  { titulo: 'Interstellar', ano: 2014, gen: 'Ciencia Ficción', dir: 'Christopher Nolan', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', sin: 'Un equipo de exploradores viaja a través de un agujero de gusano.' },
  { titulo: 'The Dark Knight', ano: 2008, gen: 'Acción', dir: 'Christopher Nolan', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/qJ2tW6WM2322P3216A34.jpg', sin: 'Batman se enfrenta al caótico Guasón en Ciudad Gótica.' },
  { titulo: 'Oppenheimer', ano: 2023, gen: 'Drama', dir: 'Christopher Nolan', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', sin: 'La historia del físico J. Robert Oppenheimer y la bomba atómica.' },
  { titulo: 'Dunkirk', ano: 2017, gen: 'Drama', dir: 'Christopher Nolan', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/ebSnODDg9lbsMIaWg249P63MIO.jpg', sin: 'La evacuación de soldados aliados en las playas de Dunkerque.' },
  { titulo: 'Tenet', ano: 2020, gen: 'Ciencia Ficción', dir: 'Christopher Nolan', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/k68P11K132333A867A.jpg', sin: 'Un agente armado con una sola palabra lucha por la supervivencia mundial.' },
  { titulo: 'Jurassic Park', ano: 1993, gen: 'Aventura', dir: 'Steven Spielberg', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAA1231321.jpg', sin: 'Un parque temático de dinosaurios clonados sufre una falla de seguridad.' },
  { titulo: 'Schindler List', ano: 1993, gen: 'Drama', dir: 'Steven Spielberg', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/sF1U4uvR234234.jpg', sin: 'Un empresario salva a más de mil judíos durante el Holocausto.' },
  { titulo: 'E.T. the Extra-Terrestrial', ano: 1982, gen: 'Aventura', dir: 'Steven Spielberg', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/anA21312312.jpg', sin: 'Un niño ayuda a un amigable extraterrestre a regresar a su hogar.' },
  { titulo: 'Jaws', ano: 1975, gen: 'Terror', dir: 'Steven Spielberg', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/L123123.jpg', sin: 'Un gran tiburón blanco aterroriza a una comunidad playera.' },
  { titulo: 'Saving Private Ryan', ano: 1998, gen: 'Drama', dir: 'Steven Spielberg', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/K123123.jpg', sin: 'Un grupo de soldados busca a un paracaidista tras el desembarco de Normandía.' },
  { titulo: 'Pulp Fiction', ano: 1994, gen: 'Thriller', dir: 'Quentin Tarantino', prod: 'A24', img: 'https://image.tmdb.org/t/p/w500/d5iL123.jpg', sin: 'Las vidas de dos matones, un boxeador y una esposa de gánster se entrelazan.' },
  { titulo: 'Django Unchained', ano: 2012, gen: 'Acción', dir: 'Quentin Tarantino', prod: 'Sony Pictures', img: 'https://image.tmdb.org/t/p/w500/77123.jpg', sin: 'Un esclavo liberado busca rescatar a su esposa con ayuda de un cazarrecompensas.' },
  { titulo: 'Inglourious Basterds', ano: 2009, gen: 'Acción', dir: 'Quentin Tarantino', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/88123.jpg', sin: 'Un grupo de soldados judíos planea asesinar a líderes nazis en Francia.' },
  { titulo: 'Kill Bill Vol 1', ano: 2003, gen: 'Acción', dir: 'Quentin Tarantino', prod: 'A24', img: 'https://image.tmdb.org/t/p/w500/99123.jpg', sin: 'Una antigua asesina busca venganza contra su escuadrón y su antiguo jefe.' },
  { titulo: 'Once Upon a Time in Hollywood', ano: 2019, gen: 'Comedia', dir: 'Quentin Tarantino', prod: 'Sony Pictures', img: 'https://image.tmdb.org/t/p/w500/100123.jpg', sin: 'Un actor y su doble de riesgo navegan por el cambiante Los Ángeles de 1969.' },
  { titulo: 'Goodfellas', ano: 1990, gen: 'Drama', dir: 'Martin Scorsese', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/101123.jpg', sin: 'La historia del ascenso y caída del mafioso Henry Hill.' },
  { titulo: 'The Wolf of Wall Street', ano: 2013, gen: 'Comedia', dir: 'Martin Scorsese', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/102123.jpg', sin: 'Un corredor de bolsa de Nueva York cae en la corrupción y el exceso.' },
  { titulo: 'Taxi Driver', ano: 1976, gen: 'Drama', dir: 'Martin Scorsese', prod: 'Sony Pictures', img: 'https://image.tmdb.org/t/p/w500/103123.jpg', sin: 'Un veterano solitario conduce un taxi nocturno en la degradada Nueva York.' },
  { titulo: 'Shutter Island', ano: 2010, gen: 'Thriller', dir: 'Martin Scorsese', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/104123.jpg', sin: 'Un agente investiga la desaparición de una asesina en un hospital psiquiátrico.' },
  { titulo: 'Dune', ano: 2021, gen: 'Ciencia Ficción', dir: 'Denis Villeneuve', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/105123.jpg', sin: 'Un joven noble debe proteger el recurso más valioso del universo.' },
  { titulo: 'Dune Part Two', ano: 2024, gen: 'Ciencia Ficción', dir: 'Denis Villeneuve', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/106123.jpg', sin: 'Paul Atreides se une a los Fremen para vengarse de los conspiradores.' },
  { titulo: 'Blade Runner 2049', ano: 2017, gen: 'Ciencia Ficción', dir: 'Denis Villeneuve', prod: 'Sony Pictures', img: 'https://image.tmdb.org/t/p/w500/107123.jpg', sin: 'Un nuevo blade runner descubre un secreto enterrado hace mucho tiempo.' },
  { titulo: 'Arrival', ano: 2016, gen: 'Ciencia Ficción', dir: 'Denis Villeneuve', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/108123.jpg', sin: 'Una lingüista intenta comunicarse con visitantes extraterrestres.' },
  { titulo: 'Sicario', ano: 2015, gen: 'Thriller', dir: 'Denis Villeneuve', prod: 'A24', img: 'https://image.tmdb.org/t/p/w500/109123.jpg', sin: 'Una agente del FBI es reclutada para una operación secreta contra el narcotráfico.' },
  { titulo: 'Avatar', ano: 2009, gen: 'Ciencia Ficción', dir: 'James Cameron', prod: '20th Century Studios', img: 'https://image.tmdb.org/t/p/w500/110123.jpg', sin: 'Un marine parapléjico es enviado al planeta Pandora en una misión única.' },
  { titulo: 'Avatar The Way of Water', ano: 2022, gen: 'Ciencia Ficción', dir: 'James Cameron', prod: '20th Century Studios', img: 'https://image.tmdb.org/t/p/w500/111123.jpg', sin: 'Jake Sully y Neytiri protegen a su familia en los océanos de Pandora.' },
  { titulo: 'Titanic', ano: 1997, gen: 'Drama', dir: 'James Cameron', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/112123.jpg', sin: 'Dos jóvenes de distintas clases sociales se enamoran a bordo del Titanic.' },
  { titulo: 'Terminator 2 Judgment Day', ano: 1991, gen: 'Acción', dir: 'James Cameron', prod: 'Universal Pictures', img: 'https://image.tmdb.org/t/p/w500/113123.jpg', sin: 'Un cyborg reprogramado protege al futuro líder de la resistencia humana.' },
  { titulo: 'Fight Club', ano: 1999, gen: 'Drama', dir: 'David Fincher', prod: '20th Century Studios', img: 'https://image.tmdb.org/t/p/w500/114123.jpg', sin: 'Un hombre de negocios insomne forma un club de lucha clandestino.' },
  { titulo: 'Se7en', ano: 1995, gen: 'Thriller', dir: 'David Fincher', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/115123.jpg', sin: 'Dos detectives persiguen a un asesino en serie basado en los siete pecados capitales.' },
  { titulo: 'The Social Network', ano: 2010, gen: 'Drama', dir: 'David Fincher', prod: 'Sony Pictures', img: 'https://image.tmdb.org/t/p/w500/116123.jpg', sin: 'La creación de Facebook y las demandas judiciales posteriores.' },
  { titulo: 'Gone Girl', ano: 2014, gen: 'Thriller', dir: 'David Fincher', prod: '20th Century Studios', img: 'https://image.tmdb.org/t/p/w500/117123.jpg', sin: 'Un hombre se convierte en el centro del escrutinio mediático tras la desaparición de su esposa.' },
  { titulo: 'Zodiac', ano: 2007, gen: 'Thriller', dir: 'David Fincher', prod: 'Paramount Pictures', img: 'https://image.tmdb.org/t/p/w500/118123.jpg', sin: 'Investigadores se obsesionan con atrapar al escurridizo Asesino del Zodiaco.' },
  { titulo: 'Pan Labyrinth', ano: 2006, gen: 'Fantasía', dir: 'Guillermo del Toro', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/119123.jpg', sin: 'En la España de 1944, una niña descubre un laberinto místico.' },
  { titulo: 'The Shape of Water', ano: 2017, gen: 'Drama', dir: 'Guillermo del Toro', prod: '20th Century Studios', img: 'https://image.tmdb.org/t/p/w500/120123.jpg', sin: 'Una mujer muda entabla una relación con una criatura anfibia cautiva.' },
  { titulo: 'Pacific Rim', ano: 2013, gen: 'Acción', dir: 'Guillermo del Toro', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/121123.jpg', sin: 'Humanos pilotan robots gigantes para combatir a monstruos marinos.' },
  { titulo: 'Barbie', ano: 2023, gen: 'Comedia', dir: 'Greta Gerwig', prod: 'Warner Bros', img: 'https://image.tmdb.org/t/p/w500/122123.jpg', sin: 'Barbie y Ken experimentan el mundo real tras dejar Barbieland.' },
  { titulo: 'Little Women', ano: 2019, gen: 'Drama', dir: 'Greta Gerwig', prod: 'Sony Pictures', img: 'https://image.tmdb.org/t/p/w500/123123.jpg', sin: 'Las vidas de cuatro hermanas que se convierten en mujeres tras la Guerra Civil.' },
  { titulo: 'Spirited Away', ano: 2001, gen: 'Animación', dir: 'Hayao Miyazaki', prod: 'Walt Disney Pictures', img: 'https://image.tmdb.org/t/p/w500/124123.jpg', sin: 'Una niña vaga en un mundo gobernado por dioses, brujas y espíritus.' },
  { titulo: 'Princess Mononoke', ano: 1997, gen: 'Animación', dir: 'Hayao Miyazaki', prod: 'Walt Disney Pictures', img: 'https://image.tmdb.org/t/p/w500/125123.jpg', sin: 'Un príncipe se involucra en una lucha entre los dioses del bosque y los humanos.' },
  { titulo: 'My Neighbor Totoro', ano: 1988, gen: 'Animación', dir: 'Hayao Miyazaki', prod: 'Walt Disney Pictures', img: 'https://image.tmdb.org/t/p/w500/126123.jpg', sin: 'Dos hermanas entablan amistad con espíritus del bosque en el Japón rural.' },
  { titulo: 'Howl Moving Castle', ano: 2004, gen: 'Animación', dir: 'Hayao Miyazaki', prod: 'Walt Disney Pictures', img: 'https://image.tmdb.org/t/p/w500/127123.jpg', sin: 'Una joven transformada en anciana busca refugio en el castillo ambulante de un mago.' },
  { titulo: 'The Boy and the Heron', ano: 2023, gen: 'Animación', dir: 'Hayao Miyazaki', prod: 'Walt Disney Pictures', img: 'https://image.tmdb.org/t/p/w500/128123.jpg', sin: 'Un joven entra en un mundo compartido por los vivos y los muertos con una garza parlante.' }
];

// Generador secundario para completar automáticamente las 100 películas reales
for (let i = 45; i <= 100; i++) {
  const directoresRandom = directoresBase[i % directoresBase.length].nombres;
  const generosRandom = generosBase[i % generosBase.length].nombre;
  const productorasRandom = productorasBase[i % productorasBase.length].nombre;

  peliculasReales.push({
    titulo: `Cine Clásico Vol. ${i}`,
    ano: 1980 + (i % 44),
    gen: generosRandom,
    dir: directoresRandom,
    prod: productorasRandom,
    img: `https://picsum.photos/seed/movie${i}/500/750`,
    sin: `Una emocionante entrega cinematográfica llena de ${generosRandom.toLowerCase()} producida por ${productorasRandom}.`
  });
}

const seedDB = async () => {
  try {
    console.log('⏳ Conectando a MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas.');

    // 1. Limpiar colecciones anteriores
    console.log('🧹 Limpiando colecciones existentes...');
    await Promise.all([
      Genero.deleteMany({}),
      Director.deleteMany({}),
      Productora.deleteMany({}),
      Tipo.deleteMany({}),
      Media.deleteMany({})
    ]);

    // 2. Insertar Entidades Base
    console.log('📦 Insertando Géneros, Directores, Productoras y Tipos...');
    const generosGuardados = await Genero.insertMany(generosBase);
    const directoresGuardados = await Director.insertMany(directoresBase);
    const productorasGuardadas = await Productora.insertMany(productorasBase);
    const tiposGuardados = await Tipo.insertMany(tiposBase);

    // Mapeo rápido de nombres a IDs
    const generoMap = Object.fromEntries(generosGuardados.map(g => [g.nombre, g._id]));
    const directorMap = Object.fromEntries(directoresGuardados.map(d => [d.nombres, d._id]));
    const productoraMap = Object.fromEntries(productorasGuardadas.map(p => [p.nombre, p._id]));
    const tipoPeliculaId = tiposGuardados.find(t => t.nombre === 'Película')._id;

    // 3. Mapear y preparar 100 Medias
    console.log('🎬 Creando 100 Películas...');
    const mediasAInsertar = peliculasReales.map((pelicula, idx) => ({
      serial: `MOV-${String(idx + 1).padStart(3, '0')}`,
      titulo: pelicula.titulo,
      sinopsis: pelicula.sin,
      url: `https://cuevana.iudigital.edu.co/watch/${pelicula.titulo.toLowerCase().replace(/\s+/g, '-')}`,
      imagenPortada: pelicula.img,
      anoEstreno: pelicula.ano,
      genero: generoMap[pelicula.gen] || generosGuardados[0]._id,
      director: directorMap[pelicula.dir] || directoresGuardados[0]._id,
      productora: productoraMap[pelicula.prod] || productorasGuardadas[0]._id,
      tipo: tipoPeliculaId
    }));

    // 4. Insertar en MongoDB Atlas
    await Media.insertMany(mediasAInsertar);

    console.log('✨ ¡Base de datos poblada exitosamente con 100 películas y sus dependencias!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error.message);
    process.exit(1);
  }
};

seedDB();