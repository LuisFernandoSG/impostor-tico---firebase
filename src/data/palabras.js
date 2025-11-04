// ============================================
// src/data/palabras.js
// ============================================

const animales = [
    { palabra: 'Perezoso', pista: 'Animal' },
    { palabra: 'Tucan', pista: 'Animal' },
    { palabra: 'Jaguar', pista: 'Animal' },
    { palabra: 'Iguana', pista: 'Animal' },
    { palabra: 'Mono', pista: 'Animal' },
    { palabra: 'Caiman', pista: 'Animal' },
    { palabra: 'Pez', pista: 'Animal' },
    { palabra: 'Gato', pista: 'Animal' },
    { palabra: 'Perro', pista: 'Animal' },
    { palabra: 'Rana', pista: 'Animal' },
    { palabra: 'Zorro', pista: 'Animal' },
    { palabra: 'Lobo', pista: 'Animal' },
    { palabra: 'Oso', pista: 'Animal' },
    { palabra: 'Cebra', pista: 'Animal' },
    { palabra: 'Tigre', pista: 'Animal' },
    { palabra: 'Elefante', pista: 'Animal' },
    { palabra: 'Jirafa', pista: 'Animal' },
    { palabra: 'Foca', pista: 'Animal' },
    { palabra: 'Delfin', pista: 'Animal' },
    { palabra: 'Raton', pista: 'Animal' },
    { palabra: 'Buitre', pista: 'Animal' },
    { palabra: 'Camaleon', pista: 'Animal' },
    { palabra: 'Aguila', pista: 'Animal' },
    { palabra: 'Cangrejo', pista: 'Animal' },
];

const lugares = [
    { palabra: 'Monteverde', pista: 'Lugar' },
    { palabra: 'Arenal', pista: 'Lugar' },
    { palabra: 'Uvita', pista: 'Lugar' },
    { palabra: 'Poas', pista: 'Lugar' },
    { palabra: 'Paris', pista: 'Ciudad' },
    { palabra: 'Roma', pista: 'Ciudad' },
    { palabra: 'Madrid', pista: 'Ciudad' },
    { palabra: 'Tokio', pista: 'Ciudad' },
    { palabra: 'Brasil', pista: 'Pais' },
    { palabra: 'CostaRica', pista: 'Pais' },
    { palabra: 'Canarias', pista: 'Lugar' },
    { palabra: 'Panama', pista: 'Pais' },
    { palabra: 'Mexico', pista: 'Pais' },
    { palabra: 'Nairobi', pista: 'Ciudad' },
    { palabra: 'Dubai', pista: 'Ciudad' },
    { palabra: 'Berlin', pista: 'Ciudad' },
    { palabra: 'Lisboa', pista: 'Ciudad' },
    { palabra: 'Cairo', pista: 'Ciudad' },
    { palabra: 'Venecia', pista: 'Ciudad' },
    { palabra: 'Shanghai', pista: 'Ciudad' },
    { palabra: 'Londres', pista: 'Ciudad' },
    { palabra: 'Delhi', pista: 'Ciudad' },
    { palabra: 'Barcelona', pista: 'Ciudad' },
];

const comidaTica = [
    { palabra: 'Gallo', pista: 'Comida' },
    { palabra: 'Casado', pista: 'Comida' },
    { palabra: 'Chifrijo', pista: 'Comida' },
    { palabra: 'Tamales', pista: 'Comida' },
    { palabra: 'Churchill', pista: 'Postre' },
    { palabra: 'Vigoron', pista: 'Comida' },
    { palabra: 'Pejibaye', pista: 'Comida' },
    { palabra: 'Olla', pista: 'Comida' },
    { palabra: 'Sopa', pista: 'Comida' },
    { palabra: 'Chorreadas', pista: 'Comida' },
    { palabra: 'Empanada', pista: 'Comida' },
    { palabra: 'Copos', pista: 'Postre' },
    { palabra: 'Mogambo', pista: 'Comida' },
];

const comidaGeneral = [
    { palabra: 'Pizza', pista: 'Comida' },
    { palabra: 'Pasta', pista: 'Comida' },
    { palabra: 'Arroz', pista: 'Comida' },
    { palabra: 'Sopa', pista: 'Comida' },
    { palabra: 'Pan', pista: 'Comida' },
    { palabra: 'Queso', pista: 'Comida' },
    { palabra: 'Carne', pista: 'Comida' },
    { palabra: 'Pollo', pista: 'Comida' },
    { palabra: 'Leche', pista: 'Comida' },
    { palabra: 'Huevo', pista: 'Comida' },
    { palabra: 'Pescado', pista: 'Comida' },
    { palabra: 'Fruta', pista: 'Comida' },
    { palabra: 'Verdura', pista: 'Comida' },
    { palabra: 'Galleta', pista: 'Postre' },
    { palabra: 'Helado', pista: 'Postre' },
    { palabra: 'Torta', pista: 'Postre' },
    { palabra: 'Chocolate', pista: 'Postre' },
];

const bebidas = [
    { palabra: 'Agua', pista: 'Bebida' },
    { palabra: 'Jugo', pista: 'Bebida' },
    { palabra: 'Cafe', pista: 'Bebida' },
    { palabra: 'Te', pista: 'Bebida' },
    { palabra: 'Refresco', pista: 'Bebida' },
    { palabra: 'Birra', pista: 'Bebida Alcoholica' },
    { palabra: 'Guaro', pista: 'Bebida Alcoholica' },
    { palabra: 'Cacique', pista: 'Bebida Alcoholica' },
    { palabra: 'Horchata', pista: 'Bebida' },
    { palabra: 'Aguadulce', pista: 'Bebida' },
    { palabra: 'Vino', pista: 'Bebida Alcoholica' },
    { palabra: 'Cerveza', pista: 'Bebida Alcoholica' },
];

const anime = [
    { palabra: 'Naruto', pista: 'Anime' },
    { palabra: 'Goku', pista: 'Anime' },
    { palabra: 'Luffy', pista: 'Anime' },
    { palabra: 'Sakura', pista: 'Anime' },
    { palabra: 'Saitama', pista: 'Anime' },
    { palabra: 'Ash', pista: 'Anime' },
    { palabra: 'Pikachu', pista: 'Anime' },
    { palabra: 'Levi', pista: 'Anime' },
    { palabra: 'Eren', pista: 'Anime' },
    { palabra: 'Mikasa', pista: 'Anime' },
    { palabra: 'Totoro', pista: 'Anime' },
    { palabra: 'Gon', pista: 'Anime' },
    { palabra: 'Killua', pista: 'Anime' },
    { palabra: 'Sasuke', pista: 'Anime' },
    { palabra: 'Hinata', pista: 'Anime' },
];

const peliculas = [
    { palabra: 'Matrix', pista: 'Pelicula' },
    { palabra: 'Titanic', pista: 'Pelicula' },
    { palabra: 'Avatar', pista: 'Pelicula' },
    { palabra: 'Gladiator', pista: 'Pelicula' },
    { palabra: 'Joker', pista: 'Pelicula' },
    { palabra: 'Coco', pista: 'Pelicula' },
    { palabra: 'Inception', pista: 'Pelicula' },
    { palabra: 'Batman', pista: 'Pelicula' },
    { palabra: 'Shrek', pista: 'Pelicula' },
    { palabra: 'Frozen', pista: 'Pelicula' },
    { palabra: 'Jumanji', pista: 'Pelicula' },
    { palabra: 'Moana', pista: 'Pelicula' },
    { palabra: 'Aladdin', pista: 'Pelicula' },
];

const famosos = [
    { palabra: 'Shakira', pista: 'Famoso' },
    { palabra: 'Messi', pista: 'Famoso' },
    { palabra: 'Rihanna', pista: 'Famoso' },
    { palabra: 'Bieber', pista: 'Famoso' },
    { palabra: 'Beyonce', pista: 'Famoso' },
    { palabra: 'Eminem', pista: 'Famoso' },
    { palabra: 'Taylor', pista: 'Famoso' },
    { palabra: 'Drake', pista: 'Famoso' },
    { palabra: 'Kanye', pista: 'Famoso' },
    { palabra: 'Oprah', pista: 'Famoso' },
    { palabra: 'Adele', pista: 'Famoso' },
    { palabra: 'CardiB', pista: 'Famoso' },
    { palabra: 'BadBunny', pista: 'Famoso' },
];

const vidaCotidiana = [
    { palabra: 'Silla', pista: 'Objeto' },
    { palabra: 'Mesa', pista: 'Objeto' },
    { palabra: 'Zapato', pista: 'Objeto' },
    { palabra: 'Reloj', pista: 'Objeto' },
    { palabra: 'Bolsa', pista: 'Objeto' },
    { palabra: 'Cama', pista: 'Objeto' },
    { palabra: 'Puerta', pista: 'Objeto' },
    { palabra: 'Cuchara', pista: 'Objeto' },
    { palabra: 'Plato', pista: 'Objeto' },
    { palabra: 'Ventana', pista: 'Objeto' },
    { palabra: 'Luz', pista: 'Objeto' },
    { palabra: 'Llave', pista: 'Objeto' },
    { palabra: 'Libro', pista: 'Objeto' },
    { palabra: 'Telefono', pista: 'Objeto' },
    { palabra: 'Carro', pista: 'Objeto' },
];

const expresionesTicas = [
    { palabra: 'Tuanis', pista: 'Expresion' },
    { palabra: 'Mae', pista: 'Expresion' },
    { palabra: 'Diay', pista: 'Expresion' },
    { palabra: 'Chiva', pista: 'Expresion' },
    { palabra: 'PuraVida', pista: 'Expresion' },
    { palabra: 'Brete', pista: 'Expresion' },
    { palabra: 'Jamar', pista: 'Expresion' },
    { palabra: 'Chinear', pista: 'Expresion' },
    { palabra: 'Goma', pista: 'Expresion' },
    { palabra: 'Pena', pista: 'Expresion' },
    { palabra: 'Macha', pista: 'Expresion' },
    { palabra: 'Guila', pista: 'Expresion' },
];

export const temas = {
  animales: { nombre: 'Animales', emoji: '🦥', palabras: animales },
  lugares: { nombre: 'Lugares', emoji: '🌎', palabras: lugares },
  comidaTica: { nombre: 'Comida Tica', emoji: '🍚', palabras: comidaTica },
  comidaGeneral: { nombre: 'Comida General', emoji: '🍕', palabras: comidaGeneral },
  bebidas: { nombre: 'Bebidas', emoji: '☕', palabras: bebidas },
  anime: { nombre: 'Anime', emoji: '🎌', palabras: anime },
  peliculas: { nombre: 'Películas', emoji: '🎬', palabras: peliculas },
  famosos: { nombre: 'Famosos', emoji: '⭐', palabras: famosos },
  vidaCotidiana: { nombre: 'Vida Cotidiana', emoji: '🏠', palabras: vidaCotidiana },
  expresionesTicas: { nombre: 'Expresiones Ticas', emoji: '🇨🇷', palabras: expresionesTicas },
};

export const getPalabraAleatoria = (temasSeleccionados) => {
  let todasLasPalabras = [];
  temasSeleccionados.forEach(temaKey => {
    if (temas[temaKey]) {
      todasLasPalabras = [...todasLasPalabras, ...temas[temaKey].palabras];
    }
  });
  
  if (todasLasPalabras.length === 0) {
    return comidaTica[0];
  }
  
  return todasLasPalabras[Math.floor(Math.random() * todasLasPalabras.length)];
};