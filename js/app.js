const albums = document.getElementById('albums')
const search = document.getElementById('search')
const searchForm = document.querySelector('.search-form')
const searchUrl = 'https://api.spotify.com/v1/search'
const renderAlbumResults = ( data ) => {
    alert("sending request")
    emptyAlbumsList()
    if(data.albums.total){
        renderAlbumsFound(data)
    }
    else {
        renderAlbumNotFound()
    }
}
function checkForEnter(evt){
    const query = {
        "q": evt.target.value,
        "type": "album"
    }
    const enterKeyValue = 13
    if(evt.keyCode === enterKeyValue){
        $.getJSON(searchUrl, query, renderAlbumResults)
    }
}

function activateAlbumSearchOnEnter(){
    search.addEventListener('keypress', checkForEnter)
}


function renderAlbumNotFound(){
    const noAlbumsLi = document.createElement('li')
    noAlbumsLi.classList.add('no-albums')
    noAlbumsLi.innerHTML = `<i class='material-icons icon-help'>help_outline</i>No albums found that match: [search form value].`
    albums.appendChild(noAlbumsLi)
}
function renderAlbum(album){
    console.log(album)
    const albumCtr = document.createElement('li')
    albumCtr.innerHTML = `<div class="album-wrap">
              <img class="album-art" src=${album.images[0].url}>
            </div>
            <span class="album-title">${album.name}</span>
            <span class="album-artist">${album.artists[0].name}</span>`
    albums.appendChild(albumCtr)
}
function renderAlbumsFound(data){
    const albums = data.albums.items
    albums.map( ( album )=>{
        renderAlbum(album)
    })
}
function emptyAlbumsList(){
    albums.innerHTML = null
}
function deactivateSearch() {
    console.log('search deactivated')
    search.removeEventListener('keypress', checkForEnter)
}
function activateSearch(){
    console.log('search activated')
    search.addEventListener('focus', activateAlbumSearchOnEnter)
}
function preventEnterSend(evt){
    evt.preventDefault()
}

search.addEventListener('blur', deactivateSearch)
search.addEventListener('focus', activateSearch)
search.addEventListener('keypress', checkForEnter)
searchForm.addEventListener('submit', preventEnterSend) //prevent default behavior of pressing enter while focused on a form input