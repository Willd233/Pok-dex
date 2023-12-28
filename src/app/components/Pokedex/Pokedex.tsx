"use client"
import { useEffect, useState } from "react"
import styles from '../Pokedex/Pokedex.module.scss'


interface Pokemon {
    id: number;
    name: string;
    img: string;
  }
export default function Pokedex() {

    const [pokemones, setPokemones] = useState<Pokemon[]>([]);

    useEffect(() => {

        const getPokemones = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
            const listPokemones = await response.json();
            const { results } = listPokemones;



            const newPokemones = results.map(async (pokemon: { url: string }) => {

                const response = await fetch(pokemon.url)
                const poke = await response.json()

                return {
                    id: poke.id,
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default
                }
            })
            setPokemones(await Promise.all(newPokemones))
        }
        getPokemones();
    }, [])

    return (
        <>
        <div className={styles.titleContainer}>
        <h1>Pokedex</h1>
        </div>
        <section className={styles.container}>
            
            {pokemones.map((pokemon, i) =>{
                return(
                    <article 
                    key={i}
                    className={styles.cars}
                    >
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.img} alt={pokemon.name} />
                        <span>#ID 0000{pokemon.id}</span>
                    </article>
                )
            }
                )}
        </section>
        </>
    )
}