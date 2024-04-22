const listapokemon = document.querySelector("#listapokemon");
const botonesHeader = document.querySelectorAll(".btn.btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/"

for(let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json()) 
        .then(data => mostrarPokemon(data)) 
}

function mostrarPokemon(data) {

    let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>` );
    tipos = tipos.join('')

    let dataId = data.id.toString();
    if(dataId.length === 1) {
        dataId = "00" + dataId;
    } else if(dataId.length === 2) {
        dataId = "0" + dataId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${dataId}</p>
        <div class="pokemon-imagen">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${dataId}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stats">${data.height}</p>
                <p class="stats">${data.weight}</p>
            </div>
        </div>
    `;
    listapokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listapokemon.innerHTML = "";

    for(let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json()) 
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data)
                }else {
                    const tipos = data.types.map(type => type.type.name);
                if(tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
                } 
            }) 
    }
}))