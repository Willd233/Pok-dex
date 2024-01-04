import styles from '../PokeStats/PokeStats.module.scss';

interface Props {
    pokemon: any;
    onClose: () => void;
}



const PokeStats: React.FC<Props> = ({ pokemon, onClose }) => {


    const statsData = pokemon.stats.map((stat: { base: number; name: string; }) => ({
        base: stat.base,
        name: stat.name,
    }));

    return (
        <div className={styles.modal}>
            <section className={styles.pokeStats}>
                <div className={styles.imagen}>
                    <img src={pokemon.img} alt={pokemon.name} />
                </div>
                <section className={styles.inf}>
                    <h2 className={styles.title}>{pokemon.name}<br />(#00{pokemon.id})</h2>
                    {pokemon.types?.map((type: string, i: number) =>
                        <span key={i} className={`${styles.tag} ${styles[type.toLowerCase()]}`}>{type}</span>
                    )}
                    <h3>Habilidades</h3>
                    {pokemon.abilities?.map((ability: string, i: string) =>
                        <span key={i} className={styles.tag}>{ability} </span>)}
                </section>
                <div className={styles.listStats}>
                    <h3>Estadisticas</h3>
                    {statsData.map((stat: any) => (
                        <div key={stat.name} className={styles.progressContainer}>
                            <span className={styles.statName}>{stat.name}</span>
                            <progress className={styles.lineas} value={stat.base} max="120" />
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>X</button>

            </section>
        </div>
    );
};

export default PokeStats;
