// Iniciamos la página actual en 1
let currentPage = 1;

// Obtenemos los elementos HTML con los que vamos a trabajar
const characterList = document.getElementById('character-list');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

// Función para obtener los personajes de la API
function fetchCharacters(page) {
  // Hacemos una solicitud para obtener los personajes de la página que queremos
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        // Si la respuesta no es correcta, lanzamos un error
        throw new Error('La solicitud no fue exitosa');
      }
      // Convertimos la respuesta a JSON
      return response.json();
    })
    .then((data) => {
      // Extraemos los personajes de los datos recibidos
      const characters = data.results;

      // Limpiamos el contenido anterior de la lista de personajes
      characterList.innerHTML = '';

      // Recorremos cada personaje y lo mostramos en la página
      characters.forEach((char) => {
        // Creamos un contenedor para el personaje
        const div = document.createElement('div');
        div.classList.add('character'); // Le damos una clase para estilizar

        // Ponemos el nombre, especie e imagen del personaje en el div
        div.innerHTML = `
          <img src="${char.image}" alt="${char.name}">
          <p><strong>Name:</strong> ${char.name}</p>
          <p><strong>Species:</strong> ${char.species}</p>
        `;

        // Agregamos el div a la lista de personajes
        characterList.appendChild(div);
      });

      // Si estamos en la primera página, deshabilitamos el botón "Anterior"
      prevButton.disabled = page === 1;

      // Si no hay siguiente página, deshabilitamos el botón "Siguiente"
      nextButton.disabled = !data.info.next;
    })
    .catch((error) => {
      // Si hay algún error, lo mostramos en la consola
      console.error('Error:', error);
    });
}

// Evento para el botón "Anterior"
prevButton.addEventListener('click', () => {
  // Si no estamos en la primera página, restamos 1 a la página actual
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage); // Recargamos los personajes de la nueva página
  }
});

// Evento para el botón "Siguiente"
nextButton.addEventListener('click', () => {
  // Aumentamos la página actual en 1
  currentPage++;
  fetchCharacters(currentPage); // Recargamos los personajes de la nueva página
});

// Cargamos los personajes de la primera página cuando se carga la página
fetchCharacters(currentPage);

