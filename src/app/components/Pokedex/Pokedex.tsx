"use client"
import usePokemones from '@/hook/usePokemones'
import styles from '../Pokedex/Pokedex.module.scss'
import { Search } from '../Search/search';
import PokeStats from '../PokeStats/PokeStats';
import { SetStateAction, useRef, useState } from 'react';

export default function Pokedex() {
    const { pokemones, loading,searchPokemons,useIntersectionObserver} = usePokemones();
    const moreDataRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver(moreDataRef);


    const [showModal, setShowModal] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [search, setSearch] = useState('')

    const handleShowModal = (pokemon: SetStateAction<{}>) => {
        setShowModal(true);
        setSelectedPokemon(pokemon);
    };

    const searchPokemones = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (!search) return

        const pokemons = await searchPokemons(search)

        setShowModal(true)
        setSelectedPokemon(pokemons)

        console.log('enciando')
    }



    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <div className={styles.container}>
                <article className={styles.midBall1}>
                    <img src="pokeball-up_1.svg" />
                </article>
                <article className={styles.pokeStatus}>
                    {showModal && <PokeStats pokemon={selectedPokemon} onClose={handleCloseModal} />}
                </article>
                <section className={styles.pokeSectionContainer}>
                    <Search search={search} setSearch={setSearch} searchPokemones={searchPokemones} />
                    <div className={styles.infinite} >
                        <section
                            className={styles.pokeContainer}>
                            {loading && <img src="pokeball_loading.svg" alt="" />}
                            {pokemones.map((pokemon, i,) => {
                                return (
                                    <article
                                        key={i}
                                        className={styles.cars}
                                        onClick={() => handleShowModal(pokemon)}
                                    >
                                        <span><img src={pokemon.img} alt={pokemon.name} />#ID 00{pokemon.id} <h2>{pokemon.name}</h2> </span>
                                    </article>
                                )
                            }
                            )}
                        </section>
                        <div ref={moreDataRef} id='moreData'>Loanding...</div>
                    </div>
                   

                </section>

            </div>
        </>
    )
}