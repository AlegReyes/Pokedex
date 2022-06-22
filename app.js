let linkPokemon = 'https://pokeapi.co/api/v2/pokemon/'
let pokemon = document.getElementById('pokemonName')
let buttonSearch = document.getElementById('searchPokemon')
let buttonDelete = document.getElementById('deletePokemon')
let appNode = document.getElementById('app')

buttonSearch.addEventListener('click' , insertPokemon)
buttonSearch.addEventListener('touchstart' , insertPokemon)//touchstar en vez de click para que sirva en celulares
buttonDelete.addEventListener('click' , deletePokemon)
buttonDelete.addEventListener('touchstart' , deletePokemon)

function insertPokemon(){
    window.fetch(`${linkPokemon}${pokemon.value.toLowerCase()}`)
        .then(response => {
            if(response.status == 404){
                alert('Este pokemon no esta disponible.Intenta con otro')
            }else{
                return response.json()
            }
        })
        .then (responseJSON => {
            let allItems = [] //va atener la informacion que se va a insertar

            let result = []//
            for( let pokemonInfo in responseJSON){//para cada pokemon que tenemos en la respuesta JSON
            result.push([pokemonInfo , responseJSON[pokemonInfo]])
            }

            console.table(result)

            //PARA CREAR LA IMAGEN DEL POKIMON
            let pokemonImage = document.createElement('img')
            pokemonImage.src=result[14][1].front_default

            //Nombre e ID
            let pokemonName = document.createElement('h2')
            pokemonName.innerText =`Name: ${result[10][1]} - ID: ${result[6][1]}`

            //tipo
            let pokemonType = document.createElement('h2')
            pokemonType.innerText = `Type: ${result[16][1][0].type.name}`

            //contenedor
            let container = document.createElement('div')
            container.append(pokemonImage , pokemonName , pokemonType) 

            allItems.push(container)

            appNode.append(...allItems)
        })

    console.log('Presionaste buscar')
}

function deletePokemon(){
    console.log('Presionaste eliminar')
    let allPokemon = appNode.childNodes//lista de nodos
    allPokemon = Array.from(allPokemon)//transformamos la lista de nodos en un array

    allPokemon.forEach(pokemon => {
        pokemon.remove(pokemon)
    })

    
}