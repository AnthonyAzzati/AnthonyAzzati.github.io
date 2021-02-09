let menuBtn     = document.getElementById('menuBtn')        // On récupère l'icône du menu sur smartphone
let mobileMenu  = document.getElementById('mobileMenu')     // On récupère les liens du menu

// Lors du clic de l'utilisateur (sur smartphone), le menu apparaît et disparaît
menuBtn.addEventListener('click', () => {                                       
    mobileMenu.classList.toggle('active')
})


// Permet de récupérer les produits en vente sur le site
const getProducts  = async () => {                                  
    let response = await fetch('//localhost:3000/api/cameras')
    if (response.ok) {
        let data = await response.json()
        console.log(data)
    } else {
        console.error('Erreur: ', response.status)
    }
}

getProducts()                                                       

