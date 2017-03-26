+function(){
    const albums = document.getElementById('albums')
    const search = document.getElementById('search')
    const searchForm = document.querySelector('.search-form')
    const searchUrl = 'https://api.spotify.com/v1/search'
    const renderAlbumResults = ( data ) => {
        emptyAlbumsList()
        if(data.albums.total)
            renderAlbumsFound(data)
        else 
            renderAlbumNotFound(data)
    }
    function checkForEnter(evt){
        const query = {"q": evt.target.value
            ,"type": "album"
        }
        const enterKeyValue = 13
        if(evt.keyCode === enterKeyValue)
            $.getJSON(searchUrl, query, renderAlbumResults)
    }
    
    function activateAlbumSearchOnEnter(){
        search.addEventListener('keypress', checkForEnter)
    }
    
    
    function renderAlbumNotFound(data){
        const noAlbumsLi = document.createElement('li')
        noAlbumsLi.classList.add('no-albums')
        noAlbumsLi.innerHTML = `<i class='material-icons icon-help'>help_outline</i>No albums found that match: ${data.albums.href.split('=')[1].split('&type')[0]}.`
        albums.appendChild(noAlbumsLi)
    }
    function renderAlbum(album){
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
    //use this to clear the list of albums before a new search is made
    function emptyAlbumsList(){
        albums.innerHTML = null
    }
    //the two functions below toggle what event listeners are attached to the search input
    function deactivateSearch() {
        search.removeEventListener('keypress', checkForEnter)
    }
    function activateSearch(){
        search.addEventListener('focus', activateAlbumSearchOnEnter)
    }
    function preventEnterSend(evt){
        evt.preventDefault()
    }
    
    search.addEventListener('blur', deactivateSearch)
    search.addEventListener('focus', activateSearch)
    search.addEventListener('keypress', checkForEnter)
    searchForm.addEventListener('submit', preventEnterSend) //prevent default behavior of pressing enter while focused on a form input
}()