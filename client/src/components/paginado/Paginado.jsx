/* eslint-disable react/prop-types */
import './Paginado.styles.css'

function Paginado({ currentPage, totalPages, paginate, nextPage, prevPage }) {
  const pageNumbers = [];

    // Genera los números de página para mostrar
  // Limita los números mostrados dependiendo de la página actual y el total de páginas
  const generatePageNumbers = () => {
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage === 1) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage === totalPages) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    }
  };

    // Llama a la función para generar los números de página
  generatePageNumbers();
  
  return (
    <div className='paginado'>
      <ul className='pagination'>
        <li className='page-item'>
          <button onClick={() => prevPage()} disabled={currentPage === 1} className='page-link'>
            Anterior
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
              {number}
            </button>
          </li>
        ))}
        <li className='page-item'>
          <button onClick={() => nextPage()} disabled={currentPage === totalPages} className='page-link'>
            Siguiente
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Paginado;