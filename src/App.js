import React, {useState, useEffect}  from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this

//Spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      className={`App-logo${loading ? ' App-logo-spinning' : ''}`}
      alt='interactive-logo'
    />
  )
}

const CategoryButton = ({ title, onClick }) => {
  return null
  // <button className="Cat-button" ... >
  //   <code>{title}</code>
  // </button>
}


const CategoriesList = ({ categories, onCategoryClick }) => {
  return null
  // per ciascun elemento di 'categories' renderizzare il componente <CategoryButton />
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{categories}</code><br/>
      <span className={`Dont-View-Cat${categories === "" ? "Selected-Cat" : "" }`} >
         <code >{value}</code>
       </span>
      </div>
  )
}

function App() {
  // serve al componente per essere inizializzato
  const [testo, settesto] = useState('')
  const [fetchedJoke, setFetchedJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
 

  const launchErrorAlert = (errorX) => {
    console.log("launchErrorAlert")
    if (errorX === true) { 
      (testo === "") ? alert("no value") : alert("value doesn't match")
      settesto("")
    }
  }


 
  //7 - funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
  const getAllCategories = async () => {
    //variabili d'appoggio
    let quote = {}
    let errorX = false

    try {
      setLoading(true)
     
      const response = await fetch(ALLCATEGORIESURL)
      let data = await response.json()

      //Gestione dell'errore
      if (data.error) throw new Error(data.error)

      quote = {...data}

    } catch (err) {

      errorX = true
      console.log("ERROR " , err)

    } finally {

      //fine fase caricamento
      setLoading(false)
      //salvo la variabile d'appoggio nello stato dell'errore:
      setError(errorX)

      // renderizzo elenco delle categorie 
      let elenco_C = quote

      }
    }



  // 2 - funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  const getJokeByKeyword = async () => {
    //variabili d'appoggio
    let quote = {}
    let errorX = false
    let url =""


    try {
      setLoading(true)
     
      url = `${ALLLJOKESBYKEYWORD}${testo}`

      const response = await fetch(url)
      let data = await response.json()
      //se qualcosa non va -> errore, da gestire
      if (data.error) throw new Error(data.error)

      quote = {...data.result}

    } catch (err) {

      errorX = true
      console.log("Tipo di errore " , err)

    } finally {

      //non sono più in fase di caricamento
      setLoading(false)
      //salvo la variabile d'appoggio nello stato dell'errore:
      setError(errorX)

      if (errorX === true){
        launchErrorAlert(errorX)
      } else {
        setFetchedJoke(quote[0].value)
      }

    }
  }


  // 1 - handler per l'input di testo
  const onInputTextChange= (event) => {
    settesto(event.target.value)
    console.log(event.target.value)
    setFetchedJoke("")
  }

  //Lifecycle - functional c
  useEffect(() => {
    getAllCategories()
  }, [])


    return (
      <div className="App">
        <div className="App-header">
        
          <Logo
            loading={loading}
          />

          <input
            type="search"
            id="search"
            name="search"
            placeholder="Enter keyword here"
            value={testo}
            onChange={onInputTextChange}
          />

          <button
            className="Search-Button"           
            onClick={getJokeByKeyword}
          >
          <code>CLICK TO SEARCH!</code>

          </button>
          <code>or: </code>
          <CategoriesList
            // ...
          />
        </div>

        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />

          <code>
          { !error && (
            <h2>
              SELECTED CATEGORY:
              <span className="Selected-Cat">
              {testo}
              </span>
            </h2>
          )}
          </code>

          <button
            className="Random-Button"
            // ...
          >
            <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
          </button>

          {testo !== "" && (
          <Joke
            value={fetchedJoke}
            categories={testo}
          />
          )}

        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Benigni Simona </code>
        </div>
      </div>
    );

};

export default App;
