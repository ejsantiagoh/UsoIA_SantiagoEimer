const main = document.querySelector("main");
const input = document.querySelector('input[type="text"]');
const button = document.querySelector("button");

const fetchCharacters = async (query) => {
  if (!query) return;

  let baseUrl = "https://rickandmortyapi.com/api/character";
  let url = `${baseUrl}/?name=${encodeURIComponent(query)}`;
  let hasResults = false;

  try {
    while (url) {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        if (!hasResults) {
          const noResultsMessage = document.createElement("p");
          noResultsMessage.id = "no-results";
          noResultsMessage.textContent = "No hay personajes encontrados.";
          main.appendChild(noResultsMessage);
        }
        return; // Salir si no hay resultados
      }

      data.results.forEach((character) => {
        const characterInfo = document.createElement("div");
        characterInfo.classList.add("character");

        const characterImage = document.createElement("img");
        characterImage.src = character.image;
        characterImage.alt = `${character.name} Image`;
        characterImage.style.width = "100%";
        characterInfo.appendChild(characterImage);

        const characterName = document.createElement("h3");
        characterName.textContent = character.name;
        characterInfo.appendChild(characterName);

        const characterStatus = document.createElement("p");
        characterStatus.textContent = character.status;
        characterInfo.appendChild(characterStatus);

        main.appendChild(characterInfo);
        hasResults = true;
      });

      url = data.info.next || null;
    }
  } catch (error) {
    console.error("Hubo un problema con la solicitud Fetch:", error);
    const errorMessage = document.createElement("p");
    errorMessage.id = "error";
    errorMessage.textContent = "Hubo un error al obtener los datos.";
    main.appendChild(errorMessage);
  } finally {
    console.log("La solicitud ha finalizado.");
  }
};

// Búsqueda en vivo al escribir (a partir de la segunda letra) con debounce
let timeout;
input.addEventListener("input", (e) => {
  if (timeout) clearTimeout(timeout);

  const query = e.target.value.trim();
  main.innerHTML = "";

  if (query.length < 2) return;

  timeout = setTimeout(async () => {
    await fetchCharacters(query);
  }, 300); // 300ms de debounce
});

// Búsqueda al hacer clic en el botón (si hay texto)
button.addEventListener("click", async () => {
  const query = input.value.trim();
  main.innerHTML = "";
  await fetchCharacters(query);
});
