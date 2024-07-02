import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import Cards from '../../components/cards/Cards';
import Paginado from '../../components/paginado/Paginado';
import './Home.styles.css';
import { getDrivers } from '../../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers); // Todos los conductores sin filtrar
  const driversCopy = useSelector((state) => state.driversCopy); // Conductores filtrados u ordenados
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  // Determinar la fuente de datos para la paginación
  const driversToPaginate = driversCopy.length > 0 ? driversCopy : allDrivers;

  
  // Obtener las tarjetas para la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = driversToPaginate.slice(indexOfFirstCard, indexOfLastCard);
  // Calcular el número total de páginas
  const totalPages = Math.ceil(driversToPaginate.length / cardsPerPage);
  
  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para ir a la página siguiente
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  // Función para ir a la página anterior
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div>
      <Navbar />
      <div className='cards-container'>
        <Cards allDrivers={currentCards} /> 
      </div>
      <Paginado
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}
/*      useEffect (() => {
        discpatch(getDrivers());
        //return(()=>{
        //  clearDetail()  
        //  })  limpiar el estado cuando se sale de la pagina
      },[discpatch])*/