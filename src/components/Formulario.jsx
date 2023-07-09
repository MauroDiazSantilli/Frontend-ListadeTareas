import { Button, Form } from 'react-bootstrap';
import ListaTareas from './ListaTareas';
import React, { useState } from 'react';
import { agregarTarea, eliminarTarea, editarTarea } from './helpers/queries.js';

const Formulario = () => {
  const [tarea, setTarea] = useState('');
  const [conjuntoTareas, setConjuntoTareas] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tarea.trim() !== '') {
      try {
        const nuevaTarea = await agregarTarea({ tarea });

        setConjuntoTareas([...conjuntoTareas, nuevaTarea]);
        setTarea('');
      } catch (error) {
        setError('Error al agregar la tarea. Inténtalo nuevamente.');
        console.error(error);
      }
    }
  };

  const borrarTarea = async (tarea) => {
    try {
      await eliminarTarea(tarea.id);

      const nuevoConjuntoTareas = conjuntoTareas.filter((item) => item.id !== tarea.id);
      setConjuntoTareas(nuevoConjuntoTareas);
    } catch (error) {
      setError('Error al eliminar la tarea. Inténtalo nuevamente.');
      console.error(error);
    }
  };

  const editarTareaFunc = async (tareaEditada) => {
    const index = conjuntoTareas.findIndex((tarea) => tarea.id === tareaEditada.id);
    if (index !== -1) {
      const nuevoConjuntoTareas = [...conjuntoTareas];
      nuevoConjuntoTareas[index] = tareaEditada;
      setConjuntoTareas(nuevoConjuntoTareas);
  
      try {
        await editarTarea(tareaEditada.id, tareaEditada);

      } catch (error) {
        setError('Error al editar la tarea. Inténtalo nuevamente.');
        console.error(error);
      }
    }
  };
  

  return (
    <div>
      {error && <p>{error}</p>}
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
      <ListaTareas conjuntoTareas={conjuntoTareas} borrarTarea={borrarTarea} editarTarea={editarTareaFunc} />
    </div>
  );
};

export default Formulario;
