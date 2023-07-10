import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import ListaTareas from './ListaTareas';
import { obtenerTareas, agregarTarea, eliminarTarea, editarTarea } from './helpers/queries.js';
import Swal from 'sweetalert2';

const Formulario = () => {
  const [tarea, setTarea] = useState('');
  const [conjuntoTareas, setConjuntoTareas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerListaTareas();
  }, []);

  const obtenerListaTareas = async () => {
    try {
      const listaTareas = await obtenerTareas();
      setConjuntoTareas(listaTareas);
    } catch (error) {
      setError('Error al obtener la lista de tareas. Inténtalo nuevamente.')
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tarea.trim() !== '') {
      try {
        const nuevaTarea = await agregarTarea({ tarea })

        setConjuntoTareas((prevConjuntoTareas) => [...prevConjuntoTareas, nuevaTarea]);
        setTarea('');
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Tarea agregada exitosamente.',
        });
      } catch (error) {
        setError('Error al agregar la tarea. Inténtalo nuevamente.')
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al agregar la tarea. Inténtalo nuevamente.',
        });
      }
    }
  };

  const handleBorrarTarea = async (tareaId) => {
    try {
      await eliminarTarea(tareaId);
      setConjuntoTareas((prevConjuntoTareas) =>
        prevConjuntoTareas.filter((tarea) => tarea._id !== tareaId)
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Tarea eliminada exitosamente.',
      });
    } catch (error) {
      setError('Error al eliminar la tarea. Inténtalo nuevamente.')
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar la tarea. Inténtalo nuevamente.',
      });
    }
  };

  const handleEditarTarea = async (tareaEditada) => {
    try {
      await editarTarea(tareaEditada._id, tareaEditada);
      setConjuntoTareas((prevConjuntoTareas) =>
        prevConjuntoTareas.map((tarea) => (tarea._id === tareaEditada._id ? tareaEditada : tarea))
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Tarea editada exitosamente.',
      });
    } catch (error) {
      setError('Error al editar la tarea. Inténtalo nuevamente.');
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al editar la tarea. Inténtalo nuevamente.',
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
          />
          <Button className="ms-2" variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>
      </Form>
      <ListaTareas conjuntoTareas={conjuntoTareas} borrarTarea={handleBorrarTarea} editarTarea={handleEditarTarea} />
    </div>
  );
};

export default Formulario
