console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedURL = 'https://dog.ceo/api/breeds/list/all'
    const dogBreedList = document.querySelector('ul#dog-breeds')
    
    
    fetch(imgUrl)
    .then((response) => response.json())
    .then((dogImages) => {
        dogImages.message.forEach( dog => {
            const imageContainer= document.querySelector('div#dog-image-container')
            const imgTag = document.createElement('img')
            imgTag.setAttribute('src', dog)
            imageContainer.appendChild(imgTag)
        } )
    } )

    fetch(breedURL)
    .then((response) => response.json())
    .then((breedData) => {
            for (const breed in breedData.message){
                if (breedData.message[breed][0] === undefined) {
                    const newListItem = document.createElement('li')
                    newListItem.innerText= `${breed}`
                    dogBreedList.appendChild(newListItem)
                    newListItem.addEventListener('click', (e) =>{
                        e.target.style.color = 'red'
                    })
                }
                else if(breedData.message[breed][0] !== undefined) {
                    
                    const mainBreed = document.createElement('li')
                    mainBreed.innerText = `${breed}`
                    dogBreedList.appendChild(mainBreed)
                    const subBreedList = document.createElement('ul')
                    mainBreed.appendChild(subBreedList)
                    
                    breedData.message[breed].forEach((subBreeds) => {
                        const subBreed = document.createElement('li')
                        subBreed.innerText = `${subBreeds}`
                        subBreedList.appendChild(subBreed)
                    })
                }
            }
    })
})