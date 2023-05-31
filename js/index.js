class GitHubRepositoryFinder {                                                  //1.Schritt 
    constructor() {                                                             //2.Schritt
      this.form = document.getElementById('search-form');   /////////////////////        
      this.input = document.getElementById('username-input');////////////////////
      this.repositoryList = document.getElementById('repository-list');///////////
      this.apiUrl = 'https://api.github.com';//////////////////////////////////////
  
      this.form.addEventListener('submit', this.handleFormSubmit.bind(this));/////3.Schritt
    }
  




    async handleFormSubmit(event) {     //////////////////////////////////////////4.Schritt
      event.preventDefault();
  
      const username = this.input.value.trim();
      if (!username) return;
  
      const repositories = await this.fetchRepositories(username);
      this.displayRepositories(repositories);
    }
  





    async fetchRepositories(username) {
      const url = `${this.apiUrl}/users/${username}/repos`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  





    displayRepositories(repositories) {
      this.repositoryList.innerHTML = '';
  
      repositories.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        li.addEventListener('click', () => {
          this.openRepository(repo.html_url);
        });
        this.repositoryList.appendChild(li);
      });
    }
  




    openRepository(url) {
      window.open(url, '_blank');
    }
  }
  
  const app = new GitHubRepositoryFinder();
  


//1. Die Klasse "GitHubRepositoryFinder" wird definiert, die als Hauptcontroller für die Anwendung fungiert.


//2. Im Konstruktor initialisiert die Klasse verschiedene Eigenschaften, indem sie die erforderlichen DOM-Elemente abruft.
//   Sie ruft das Formular, das Eingabefeld und die Repository-Liste mit Hilfe ihrer entsprechenden `id`-Attribute ab.


//3. Dem Formularelement wird ein Event-Listener hinzugefügt, der auf das Event "Submit" wartet. Wenn das Formular 
//   abgeschickt wird, wird die Methode "handleFormSubmit" aufgerufen.


//4. Die Methode `handleFormSubmit` ist eine asynchrone Funktion, die für die Behandlung des Formularübermittlungs-Events 
//   verantwortlich ist. Sie verhindert das standardmäßige Übermittlungsverhalten des Formulars und extrahiert den in das 
//   Eingabefeld eingegebenen Wert, nachdem sie alle führenden oder abschließenden Leerzeichen entfernt hat.


//5. Wenn der Wert "username" leer ist oder nur Leerzeichen enthält, kehrt die Methode vorzeitig zurück und fährt nicht mit dem 
//   Abrufen von Repositories fort.


//6. Wenn ein gültiger `Benutzername` angegeben wird, ruft die Methode die Methode `fetchRepositories` auf, wobei der 
//   `Benutzername` als Argument übergeben wird, und wartet auf das Ergebnis.


//7. Die Methode `fetchRepositories` ist eine asynchrone Funktion, die einen `Benutzernamen` als Eingabe erhält. Sie 
//   konstruiert die API-URL, indem sie den `Benutzernamen` an die Basis-URL der GitHub-API anhängt.


//8. Die Methode verwendet einen `try-catch`-Block, um Fehler zu behandeln, die während der API-Anfrage auftreten können. Sie 
//   stellt eine asynchrone Anfrage mit `fetch` an die konstruierte URL.


//9. Wenn die Antwort von der API nicht erfolgreich ist (Status nicht im Bereich 200-299), wird ein Fehler mit dem Text des 
//   Antwortstatus ausgegeben.


//10. Wenn die Antwort erfolgreich ist, werden die Daten durch den Aufruf von `response.json()` extrahiert. Dies gibt ein 
//    Versprechen zurück, das zu den JSON-Daten auflöst.


//11. Die extrahierten Daten, die die Repositories des Benutzers darstellen, werden von der Funktion zurückgegeben.


//12. Tritt während der API-Anforderung oder der Datenextraktion ein Fehler auf, wird dieser im "Catch"-Block abgefangen. Der 
//    Fehler wird in der Konsole protokolliert, und es wird ein leeres Array zurückgegeben.


//13. Die Methode `displayRepositories` wird mit den von der API erhaltenen `repositories`-Daten aufgerufen.


//14. Die displayRepositories-Methode löscht den vorherigen Inhalt des Repository-Listenelements 
//    (this.repositoryList.innerHTML = '').


//15. Für jedes Repository im Repositories-Array wird ein neues <li>-Element erstellt. Der Name des Repositorys wird als 
//    Textinhalt des <li>-Elements festgelegt.


//16. Jedem Repository-Element (<li>) wird ein Event-Listener hinzugefügt, der auf das Klickevent wartet. Wenn auf ein 
//    Repository geklickt wird, wird die openRepository-Methode mit der URL des Repositorys aufgerufen.


//17. Das neu erstellte <li>-Element wird an das Repository-Listenelement angehängt.


//18. Die openRepository-Methode ist dafür verantwortlich, einen neuen Tab oder ein neues Fenster mit der bereitgestellten URL 
//    (der URL des Repositorys) zu öffnen. Es verwendet window.open mit dem Ziel _blank, um die URL in einem neuen Tab oder 
//    Fenster zu öffnen.

//19. Abschließend wird eine Instanz der GitHubRepositoryFinder-Klasse erstellt, die die Event-Listener einrichtet und die 
//    Anwendung initialisiert.
