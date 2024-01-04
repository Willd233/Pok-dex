import { useState, useEffect,RefObject } from "react";
import { PokemonesType } from "@/interfaces/Pokemones";


const URL_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

export default function usePokemones() {
  const [pokemones, setPokemones] = useState<PokemonesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");

  const fetchPokemones = async (url: string) => {
    const response = await fetch(url);
    const poke = await response.json();

    const abilities = poke.abilities.map((a: { ability: { name: string; }; }) => a.ability.name)
    const stats = poke.stats.map((s: { stat: { name: string; }; base_stat: string; }) => { return { name: s.stat.name, base: s.base_stat } })
    const types = poke.types.map((t: { type: { name: string; }; }) => t.type.name)


    return {
      id: poke.id,
      name: poke.name,
      img: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
      abilities,
      stats,
      types
    }
  }

  const getPokemons = async (url = URL_DEFAULT) => {

    setTimeout(() => setLoading(false), 200);
    const response = await fetch(url)
    const listPokemones = await response.json()
    const { next, results } = listPokemones

    const newPokemons = await Promise.all(
      results.map(
        (pokemon: { url: string }) => fetchPokemones(pokemon.url))
    );

    return{
      next,
      newPokemons
    }
  }

  const obtenPokemones = async()=>{
    const {next, newPokemons}= await getPokemons()
    setPokemones(newPokemons)
    setNextUrl(next)
  }
  

  const morePokemons = async () => {
    const { next, newPokemons } = await getPokemons(nextUrl);
    setPokemones((prev) => [
      ...prev,
      ...newPokemons.filter((newPoke) => !prev.some((poke) => poke.id === newPoke.id)),
    ]);
  
setNextUrl(next)  };

  const searchPokemons = async (search: string) => {
    const url = `${URL_ENDPOINT}${search.toLocaleLowerCase()}`
    return await fetchPokemones(url)
  }

  const useIntersectionObserver = (ref: RefObject<HTMLElement>) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
            morePokemons();   
        }
      });
    });
  
    useEffect(() => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }, [ref, observer]);
  
    return () => {
      observer.disconnect();
    };
  };

  useEffect(() => {
    obtenPokemones();
  }, []);

  

  return {
    pokemones,
    loading,
    searchPokemons,
    useIntersectionObserver
  };
};
