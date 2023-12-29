import { SearchIcon } from '@/style/icons';
import styles from './search.module.scss';


function Search() {

    return (
        <>
            <section className={styles.searchContainer}>
                <input type="text"
                    placeholder="Find your pokemon"
                />
                <button>
                <SearchIcon />

                    Search pokemon
                </button>
            </section>
        </>
    )
}

export { Search };