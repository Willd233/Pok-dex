import { SearchIcon } from '@/style/icons';
import styles from './search.module.scss';


import React, { FC } from 'react';

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchPokemones: any
}

const Search: FC<SearchProps> = ({ search, setSearch, searchPokemones }) => {
  return (
    <>
      <form className={styles.searchContainer} onSubmit={searchPokemones}>
        <input
          type="text"
          value={search} // Use the search value in the input field
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find your pokemon"
        />
        <button type='submit'>
          <SearchIcon />
          Search pokemon
        </button>
      </form>
    </>
  );
};

export { Search };