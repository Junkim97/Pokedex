import { Grid } from "@mui/material";
import axios from "axios";
import react, {useState, useEffect} from "react";
import Pagination from "./Pagination";
import PokeCard from "./PokeCard";

function App() {
  const[pokemon, setPokemon] = useState([])
  const[loading, setLoading] = useState(true);
  const[currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const[nextPageUrl, setNextPageUrl] = useState();
  const[prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios.get(currentPageUrl, {signal:controller.signal}).then(res => {
      setPokemon(res.data.results.map(p => p.url));
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setLoading(false);
    }).catch(function (error) {
      console.log(error)
    })

    return () => {
      controller.abort();
    }
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  
  if(loading) {
    return "Loading...."
  }
  return (
    <div className="App">
      <Grid container rowSpacing={2} columnSpacing={2}>
      {pokemon.map(p => 
      <Grid item xs={12} sm={6} md={3} lg={2.4}>
        <PokeCard pokemon={p}></PokeCard>
        </Grid>
      )}
      </Grid>
      <Pagination goToNextPage={nextPageUrl ? goToNextPage : null} goToPrevPage={prevPageUrl ? goToPrevPage : null}></Pagination>
    </div>
  );  
}

export default App;
