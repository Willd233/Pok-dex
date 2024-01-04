import Pokedex from './components/Pokedex/Pokedex'
import styles from '../style/index.module.scss'
import '../style/resect.scss'


export default function Home() {
  return (
    <main className={styles.main}>
      
      <h1>Pokedex</h1>
     <Pokedex />
    </main>
  )
}
