import {Container} from 'react-bootstrap'
import Formulario from './components/Formulario'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
    <Container className='my-5 mainPage'>
      <h1 className='display-4 text-center'>Listado de Tareas</h1>
      <hr />
      <Formulario/>
    </Container>
    <footer className='bg-dark text-center text-secondary py-4'>
      <p>&copy; Todos los derechos reservados</p>
    </footer>
    </>
  )
}

export default App