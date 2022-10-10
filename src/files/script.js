//pour récupérer les elements par leurs id

function _(e) {
    return document.getElementById(e);
}

//API key google

const googleApiKey = 'AIzaSyCYkLZyJnaWcB2mtInidLbr1M7l0vhgv9E';

//items-loader variables

let containerheader = _('items-container-header');
let containerheaderimg = _('items__container--header__image');
let containerheadertxt = _('items__container--header__content');
let containerproducts = _('items__container--content');
let containerimg = _('items__container--content__item--image');
let containertxt = _('items__container--content__item--description');

/*
//items variables

let nouveautes = _('nouveautes');
let robes = _('robes');
let pantalons = _('pantalons');
let shorts = _('shorts');
let combinaisons = _('combinaisons');
let tops = _('tops');
let jupes = _('jupes');
let kimonos = _('kimonos');
let accessoires = _('accessoires');
let chemises = _('chemises');
*/

// logingForm variables

let displayform= _('displayForm');
let forLogin= _('forLogin');
let loginForm= _('loginForm');
let forRegister= _('forRegister');
let registerForm= _('registerForm');
let formContainer= _('formContainer');

//au chargement de la page

window.onload= function(){
    setTimeout(openPopup, 1000);
    _('basket-postit').textContent=basket.length;
    _('wishlist-postit').textContent=wishlist.length;
    _('top-page').click(); 
    if (screen.width <1200){
        _('sidebar-toggle').click();
     }; 
    };

//importation des données des produits

let Products;

    fetch('http://127.0.0.1:3000/api/products/')
    .then (res => res.json())
    .then (res => {
        Products = res;
        console.log(Products);
        _("nouveautes").click();
        _('top-page').click(); 
    });

    

let wishlist = [];
let basket =[];

//fonction popup

function openPopup(popup){
    _('popup-overlay').style.display="flex";
    _('popup').classList.add('open-popup');
};

_('close-popup').onclick= function closePopup(){
    _('popup').classList.remove('open-popup');
    _('popup-overlay').style.display="none";
};

_('tologin').onclick=function (){
    _('popup-overlay').style.display="none";
    _('popup').classList.remove('open-popup');
    displayform.click();
}


//fonction formulaire d'inscription
let formwrapper = document.querySelector('.form-wrapper .card');
displayform.addEventListener('click', (e)=>{
    
    formwrapper.classList.add('show');
    if (formwrapper.classList.contains('show')){
        _('formLogReg-overlay').style.display="flex"
        displayform.style.backgroundColor= "var(--second-color)";
    } else {
        displayform.style.backgroundColor= "white";
    };

    _('loginbtn').onclick=function(){
        formwrapper.classList.remove('show');
        _('formLogReg-overlay').style.display="none";
        displayform.style.backgroundColor= "white";
        _('top-page').click();  
        };
                        
    _('googlebtn').onclick=function(){
        formwrapper.classList.remove('show');
        _('formLogReg-overlay').style.display="none";
        displayform.style.backgroundColor= "white";
        _('top-page').click();  
            };
    });




forRegister.addEventListener('click', (e) => {
    forLogin.classList.remove('active');
    forRegister.classList.add('active');
    if(registerForm.classList.contains('toggleForm')) {
        formContainer.style.transform = 'translate(-100%)';
        formContainer.style.transition = 'transform 0.2s';
        registerForm.classList.remove('toggleForm');
        loginForm.classList.add('toggleForm');
    };
});

forLogin.addEventListener('click', (e) => {
    forLogin.classList.add('active');
    forRegister.classList.remove('active');
    if(loginForm.classList.contains('toggleForm')) {
        formContainer.style.transform = 'translate(0%)';
        formContainer.style.transition = 'transform 0.2s';
        loginForm.classList.remove('toggleForm');
        registerForm.classList.add('toggleForm');
    };
});

//animation de la sidebar en responsive

_('todiscover').onclick=function(){
    if (screen.width <1200){
        _('sidebar-toggle').click();
     };
}

//récupération d'un produit par son nom ( searchbar)
function findProduct(e) { 
    let item;
    e.preventDefault();
    e.stopPropagation();
    fetch("http://127.0.0.1:3000/api/products/")

    .then(res => res.json())
    .then(promise => {
        data = promise
        let product= _('searchProduct-input').value;
         item = data.find( e => e.title === product)
         if(item === undefined){
            _('searchProduct-submit').textContent = 'article non trouvé !';
            function reset(){_('searchProduct-submit').textContent ='Recherche'};
            setTimeout(reset, 1000);
        }else{
            let id=item._id; 
            _('return-btn').click();
            setSlideshow(Products, id) ;
            _('scrollanchor').click()};
    });
  };

  _('searchProduct-form').addEventListener("submit", findProduct);


//chargement du header du container

function itemHeaderList(object){
                containerheaderimg.style.backgroundColor = "grey";
                containerheadertxt.textContent = object[0].category.toUpperCase();
            };


//chargement du contenu du container

function itemsList(object){
    containerproducts.innerHTML = object.map( prod => 
     
    `<div class="items__container--content__item" id="item-container">
        <div id="items__container--content__item--image" > 
            <a href="#items-container"><img src=${prod.pictures.picture1} id=${prod._id} class="item-image"></a></div>
            <div id="items__container--content__item--description">${prod.title.toUpperCase()}
            <div id="items__container--content__item--price">${prod.price} xpf</div>
        </div>
    </div>`).join('')
};

//chargement du container du slideshow

function setContainer(a, b){            
    containerheader.style.display = a;
    containerproducts.style.display = a;
    _('slideshow-container').style.display = b;
    if(screen.width < "1200px"){
    sidebar.style.transform = 'translate(-100%)';
    _('togglearrow').style.transform = ('rotate(0deg)')
    } 
    };


function setSlideshow(e, a){
    let item = e.find(elt=> {return elt._id === a});
    let pictures =Object.values(item.pictures);
    console.log(pictures);
    let curIndex = 0;
    let imgDuration = 2000;  
                    
    setContainer("none", "flex");
            
    function slideShow() {
        let index = pictures[curIndex];
        _('item-name').textContent=item.title.toUpperCase();
        _('item-price').textContent=item.price + " xpf";
        _('item-description--text').textContent=item.description;
        _('img-slideshow').src = index;
        curIndex++;
        if(curIndex==pictures.length){curIndex=0};
        timeout = window.setTimeout(slideShow, imgDuration);
    };

    slideShow();

        _('return-btn').onclick = function(){
            setContainer("flex", "none")
            window.clearTimeout(timeout);
            }; 
    
        _('addToWishlist').onclick =function(){
            wishlist.push(item);
            _('wishlist-postit').textContent=wishlist.length;
            };
                    
        _('addToBasket').onclick =function(){
            basket.push(item);
            _('basket-postit').textContent=basket.length;
            };
    };


// on récupère les evts de click dans la sidebar et le conteneur 

let selectedlist =document.querySelectorAll(['.sidebar-item']);

    selectedlist.forEach(element => {
        element.addEventListener('click', (e)=>{

            _('return-btn').click();
            let value = e.target.id; 

            let object = Products.filter(element => element.category === value);
            console.log(object);

            itemHeaderList(object);  

            itemsList(object);

            //récupération des items chargés dans le container
        
            let selecteditems =document.querySelectorAll(['.item-image']);

            selecteditems.forEach(element => {
                element.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    let id=e.target.id;
                    console.log(id);

                    //on charge le slideshow avec l'objet cliqué (id) parmi les objects affichés (items)

                    setSlideshow(object, id);
                    
                })
            });
                if (screen.width <1200){
               _('sidebar-toggle').click();
            };
            
        })
    });

//on récupère la liste des nouveautés

_('nouveautes').addEventListener('click',(e) => {
    let news = Products.filter(element => element.isNewItem == true);

        containerheaderimg.style.backgroundColor = "grey";
        containerheadertxt.textContent = "NOUVEAUTES";

        itemsList(news);

        let selecteditems =document.querySelectorAll(['.item-image']);

            selecteditems.forEach(element => {
                element.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    let id=e.target.id;
                    setSlideshow(news, id); 
                })
            });
})

//fonction sidebar responsive toggle

    _('sidebar-toggle').onclick=function(){
        sidebar.classList.toggle('show');
        if (sidebar.classList.contains('show')){
            sidebar.style.transform = 'translate(0%)';
            _('togglearrow').style.transform = ('rotate(180deg)');
            sidebar.style.boxShadow= "5px 5px 5px rgba(0, 0, 0, 0.3)";
        } else {
            sidebar.style.transform = 'translate(-100%)';
            _('togglearrow').style.transform = ('rotate(0deg)');
            sidebar.style.boxShadow= "none";
        };

        if(_('togglearrow').style.display == "none"){
            sidebar.style.transform = 'translate(0%)'
        };
    
    }
    

//fonction wishlist loader

_('toWishlist').onclick =function(){
    _('wishlist-postit').textContent=wishlist.length;
    _('wishlist-overlay').style.display="flex";
    _('wishlist-container').style.display = "flex";
    _('basket-container').style.display = "none";
    _('transfert-basket').innerText = 'Transférer au panier';
    if (wishlist.length == 0){
        _('wishlist').innerHTML = `<p>Pas d'envies pour le moment ...</p>`
    }else{
        _('wishlist').innerHTML = wishlist.map( prod => 
            `<div id="wishlist-item-container">
           <div id="wishlist-item--image" >
           <a href="#items-container"><img src=${prod.pictures.picture1}  width=60 height=80 class="item-img" id="${prod._id}"></a></div>
           <div id="wishlist-item--name">${prod.title.toUpperCase()}</div>
           <div id="wishlist-item--price">${prod.price} xpf</div>
           <div class="item-remove"><i class="fa-solid fa-xmark" id="${prod._id}" id="item--remove"></i></div>  
            </div>`).join('')

            let itemstoremove =document.querySelectorAll(['.item-remove']);

                itemstoremove.forEach(element => {
                    element.addEventListener('click', (e)=>{
 
                    let itemid=e.target.id;

                    let itemtoremove = wishlist.findIndex(element => {
                        return element._id == itemid});

                    wishlist.splice(itemtoremove,1);
                    _('toWishlist').click()
                })
            });

            let itemstopick =document.querySelectorAll(['.item-img']);

            itemstopick.forEach(element => {
                element.addEventListener('click', (e)=>{

                let itemid=e.target.id;

                _('wishlist-overlay').style.display ="none";
                _('wishlist-container').style.display = "none";
                window.clearTimeout(timeout);

                setSlideshow(wishlist, itemid);
            })
        });
    }
};

_('toBasket').onclick =function(){
    _('basket-postit').textContent=basket.length;
    _('basket-overlay').style.display="flex";
    _('basket-container').style.display = "flex";
    _('wishlist-container').style.display = "none";
    _('cashout').style.display = "none";
    _('validate-basket').textContent= `Valider ma commande`;
    if (basket.length == 0){
        _('basket').innerHTML = `<p>Votre panier est vide</p>`
    } else {
        _('basket').innerHTML = basket.map( prod => 
            `<div id="basket-item-container">
                <div id="basket-item--image" >
                <a href="#items-container"><img src=${prod.pictures.picture1} width=60 height=80 class="item-img" id="${prod._id}"></a></div>
               <div id="basket-item--name">${prod.title.toUpperCase()}</div>
               <div id="basket-item--price">${prod.price} xpf</div>
               <div class="item-remove"><i class="fa-solid fa-xmark" id="${prod._id}"></i></div>
            </div> 
             `).join('')

                let itemstoremove =document.querySelectorAll(['.item-remove']);

                itemstoremove.forEach(element => {
                    element.addEventListener('click', (e)=>{

                    let itemid=e.target.id;

                    let itemtoremove = basket.findIndex(element => {
                        return element._id == itemid});

                    basket.splice(itemtoremove,1);
                    _('toBasket').click()
                })
            });

            let itemstopick =document.querySelectorAll(['.item-img']);

                itemstopick.forEach(element => {
                    element.addEventListener('click', (e)=>{
 
                    let itemid=e.target.id;
                    
                    _('basket-overlay').style.display ="none";
                    _('basket-container').style.display = "none";
                    window.clearTimeout(timeout);

                    setSlideshow(basket, itemid);
                })
            });

    }   
};

_('continue-visit').onclick = function(){
    _('wishlist-overlay').style.display ="none";
    _('basket-container').style.display = "none";
    _('wishlist-container').style.display = "none";
};

_('continue-shopping').onclick = function(){
    _('wishlist-overlay').style.display="none";
    _('basket-overlay').style.display="none";
    _('basket-container').style.display = "none";
    _('wishlist-container').style.display = "none";
    _('validate-basket').style.display = "flex";
};

_('transfert-basket').onclick = function(){
    if(wishlist.length == 0){
        _('wishlist').innerHTML = `<p>Rien à transférer !</p>`
    } else {
        basket = wishlist
        _('wishlist').innerHTML = `<p>Liste transférée !</p>`
        _('transfert-basket').textContent = `Voir le panier`;
        _('transfert-basket').addEventListener('click', () => {
            _('wishlist-overlay').style.display="none";
            _('toBasket').click()
        })
    }
};

_('validate-basket').onclick = function(){
    if(basket.length == 0){
        _('basket').innerHTML = `<p>Votre panier est vide...</p>`
    }else {
        _('validate-basket').style.display = "none";
        _('cashout').style.display = "flex";
    }
};
