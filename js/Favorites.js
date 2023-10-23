//Classe que vai conter a lógica dos dados, como o dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    
    
  }
}

// Classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
  
    this.update();
  }

  update() {
    this.removeAllTr()
  }

  removeAllTr() {
    const tbody = document.querySelector("table tbody")

    tbody.querySelectorAll("tr")
      .forEach((tr) => {
        console.log(tr)
        tr.remove()
    })
  }
}