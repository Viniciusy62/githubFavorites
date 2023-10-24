//Classe que vai conter a lógica dos dados, como o dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'viniciusy62',
        name: 'Vinicius Andrade',
        public_repos: '23',
        followers: '4'
      },
      {
        login: 'diego3g',
        name: 'Diego Fernandes',
        public_repos: '48',
        followers: '22503'
    }
    ]
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => 
      entry.name !== user.name)
      
    console.log(filteredEntries)
  }
}

// Classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    
    this.tbody = this.root.querySelector("table tbody")
    this.update();
  }

  update() {
    this.removeAllTr()
    
    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user span').textContent = `${user.login}`
      row.querySelector('.repositories').textContent = `${user.public_repos}`
      row.querySelector('.followers').textContent = `${user.followers}`

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Confirma exclusão deste item?')
        
        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })

  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/viniciusy62.png" alt="Foto de perfil">
        <a href="https://github.com/viniciusy62" target="_blank">
          <p>Vinicius de Andrade</p>
          <span>viniciusy62</span>
        </a>
      </td>
      <td class="repositories">8</td>
      <td class="followers">3</td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr")
      .forEach((tr) => {
        
        tr.remove()
    })
  }
}