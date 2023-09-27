// Génère un tableau contenant 20 valeurs numérotées de 1 à 20
const mockPokemon = [];

for (let i = 1; i <= 20; i++) {
  mockPokemon.push({
    id: i,
    name: `Pokemon${i}`,
    hp: Math.floor(Math.random() * 100) + 1, // Valeur aléatoire entre 1 et 100 pour hp
    cp: Math.floor(Math.random() * 50) + 1,  // Valeur aléatoire entre 1 et 50 pour cp
    picture: `pokemon${i}.jpg`, // Remplacez par le nom de fichier de l'image
    types: ["Type1", "Type2"], // Remplacez par les types réels
    created: new Date().toISOString(), // Date actuelle au format ISO
  });
}

console.log(mockPokemon);


// Exporte le tableau en tant que module Node.js
module.exports = mockPokemon;
