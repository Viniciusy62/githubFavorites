class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
      .then((data) => data.json())
      .then(
        ({ login, name, public_repos, followers }) => (
          {
            login,
            name,
            public_repos,
            followers
          }
      ) )
  }
}

//Classe que vai conter a lógica dos dados, como o dados serão estruturados
class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load()

    GithubUser.search('maykbrito').then(user => {console.log(user)})
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem(
      '@github-favorites:')) || []
      console.log(this.entries)
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => 
      entry.name !== user.name)
      
    this.entries = filteredEntries
    this.update()
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