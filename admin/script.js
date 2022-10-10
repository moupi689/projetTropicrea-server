//pour récupérer les elements par leurs id

function _(e) {
    return document.getElementById(e);
}

//au chargement de la page
window.onload = function() {
    _('forProducts').click();
    _('addProduct-btn').click();
}

//affichage gestion des liens
_('forLinks').addEventListener('click', (e) => {
    _('forProducts').classList.remove('active');
    _('forLinks').classList.add('active');
    _('linksCard').style.display="flex";
    _('productsCard').style.display="none";

});

//affichage gestion des articles
_('forProducts').addEventListener('click', (e) => {
    _('forProducts').classList.add('active');
    _('forLinks').classList.remove('active');
    _('linksCard').style.display="none";
    _('productsCard').style.display="flex";
});


//trouver un article
_('findProduct-btn').addEventListener('click', () => {
    _('foundProduct-display').style.display='none';
    _('findProductForm').reset();
    _('findProduct-submit').textContent = 'Rechercher';
    _('findProductForm').style.display='flex';
    _('findProduct-btn').classList.add('active');
    _('addProduct-btn').classList.remove('active');
    _('findProduct-card').style.display = 'flex';
    _('addProduct-card').style.display= 'none';

});


//pour trouver un produit  partir de son nom (envoi formulaire méthode GET)

    //pour reset le formulaire de recherche d'un article

    function reset(){_('findProduct-btn').click()};

function findProduct(e) { 
    let item;
    e.preventDefault();
    e.stopPropagation();
    fetch("http://127.0.0.1:3000/api/products/")

    .then(res => res.json())
    .then(res => {
        data = res
        let product= _('findProduct-input').value;
         item = data.find( e => e.title === product)
        if(item === undefined){
            _('findProduct-submit').textContent = 'article non trouvé !';
            setTimeout(reset, 1000);
        }else{displayProduct(item)}; 
    });
  };

  _('findProductForm').addEventListener("submit", findProduct);

  function displayProduct(e){
    _('findProductForm').style.display='none';
    _('foundProduct-display').style.display='flex';

    _('foundProduct-display').innerHTML = 
        `<img src=${e.pictures.picture1} width=150 height=200 class="founditem-img">
        <div class="founditem-txt">${e.title.toUpperCase()}</div> 
        <div class="item-btns">
            <button type="submit" class="item-btn" id="modify-item" name=${e._id}>Modifier</button>
            <button type="submit" class="item-btn" id="delete-item" name=${e._id}>Supprimer</button>
        </div>`

        //modification d'un article

        _('modify-item').addEventListener('click',(e)=>{

            let id=e.target.name;
            
            _('findProduct-btn').classList.remove('active');
            _('foundProduct-display').style.display='none';
            _('modProduct-card').style.display='flex';
            _('addProduct-btn').classList.add('active');
            _('addProduct-btn').textContent ='Modifier un article';
            _('modProduct-submit').textContent ='Modifier';
            _('modProductForm').addEventListener("submit", modifyProduct);
            

            fetch('http://127.0.0.1:3000/api/products/' + id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    
                    _('mod-category').value = res.category;
                    _('mod-description').value = res.description;
                    _('mod-title').value = res.title;
                    _('mod-price').value = res.price;
                    _('mod-picture1').value = res.pictures.picture1;
                    _('mod-picture2').value = res.pictures.picture2;
                    _('mod-picture3').value = res.pictures.picture3;
                    _('mod-picture4').value = res.pictures.picture4;
                    _('mod-picture5').value = res.pictures.picture5;
                    });

                //pour modifier un article ( envoi formulaire methode PUT)

                function modifyProduct(e) { 
                e.preventDefault();

                if(_('mod-inStock').checked){_('mod-inStock').value=true}else{_('mod-inStock').value=false};
                if(_('mod-isNewItem').checked) {_('mod-isNewItem').value=true}else{_('mod-isNewItem').value=false};

                fetch("http://127.0.0.1:3000/api/products/" + id,{
                method: "PUT",
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: _('mod-category').value,
                    title: _('mod-title').value,
                    description:_('mod-description').value ,
                    pictures:{
                        picture1: _('mod-picture1').value,
                        picture2: _('mod-picture2').value,
                        picture3: _('mod-picture3').value,
                        picture4: _('mod-picture4').value,
                        picture5: _('mod-picture5').value,
                        },
                    price: _('mod-price').value,
                    inStock: _('mod-inStock').value ,
                    isNewItem: _('mod-isNewItem').value ,
                    userId: "admin" 
                })
                })

                .then(function(res) {
                if (res.ok) {
                    return res.json();
                };
                })
                _('modProduct-submit').textContent= 'Modifié !';

                function reset(){
                    _('modProductForm').reset();
                    _('modProduct-card').style.display='none';
                    _('addProduct-btn').click();
                }

                    setTimeout(reset, 1000);
                }
        });

        //supprimer un produit (requete DELETE)
        _('delete-item').addEventListener('click',(e)=>{

            let id = e.target.name;

            fetch('http://127.0.0.1:3000/api/products/' + id, {method: 'DELETE'})
                .then(res => res.json())
                .then(res => console.log(res));
            
                _('delete-item').textContent = 'Ok !';

                setTimeout(reset, 1000);
        });


  };


//ajouter un article
_('addProduct-btn').addEventListener('click', () => {
    _('addProduct-btn').classList.add('active');
    _('addProduct-btn').textContent ='Ajouter un article';
    _('findProduct-btn').classList.remove('active');
    _('addProduct-card').style.display= 'flex';
    _('findProduct-card').style.display = 'none';
    _('addProductForm').addEventListener("submit", addProduct);
    _('addProduct-submit').textContent= 'Envoyer';
});



//pour ajouter un article ( envoi formulaire methode POST)

function addProduct(e) { 
    e.preventDefault();

    if(_('inStock').checked){_('inStock').value=true}else{_('inStock').value=false};
    if(_('isNewItem').checked) {_('isNewItem').value=true}else{_('isNewItem').value=false};

    fetch("http://127.0.0.1:3000/api/products/",{
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: _('category').value,
        title: _('title').value,
        description:_('description').value ,
        pictures:{
            picture1: _('picture1').value,
            picture2: _('picture2').value,
            picture3: _('picture3').value,
            picture4: _('picture4').value,
            picture5: _('picture5').value,
            },
        price: _('price').value,
        inStock: _('inStock').value ,
        isNewItem: _('isNewItem').value ,
        userId: "admin" 
      })
    })

    .then(function(res) {
      if (res.ok) {
        return res.json();
      };
    })
    _('addProduct-submit').textContent= 'Envoyé !';

    function reset(){
        _('addProductForm').reset();
        _('addProduct-btn').click();
    }

        setTimeout(reset, 1000);
  }
  
  

