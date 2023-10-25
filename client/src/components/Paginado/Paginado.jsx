import styles from "./Paginado.module.css";

const Paginado = ({ pokemonsPerPage, allPokemons, paginado }) => {
  // calcula el número de páginas teniendo en cuenta la cantidad total de pokemones y la cantidad por página.
  const pageNumbers = [];
  //Math.ceil redondea hacia arriba el resultado de la division
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav className={styles.paginado}>
        <ul>
          {pageNumbers &&
            pageNumbers.map((number, index) => (
              <p key={index}>
                <button onClick={() => paginado(number)}>{number}</button>
              </p>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
