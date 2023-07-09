import { Button, ListGroup, Form } from 'react-bootstrap';
import { useState } from 'react';

const ItemTarea = ({ tarea, borrarTarea, editarTarea }) => {
  const [editando, setEditando] = useState(false);
  const [tareaEditada, setTareaEditada] = useState(tarea.tarea);

  const eliminarTarea = () => {
    borrarTarea(tarea);
  };

  const editarDatosTarea = () => {
    if (editando) {
      const tareaEditadaObj = { ...tarea, tarea: tareaEditada };
      editarTarea(tareaEditadaObj);
    }
    setEditando(!editando);
  };

  const handleChange = (e) => {
    setTareaEditada(e.target.value);
  };

  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between">
        {editando ? (
          <Form.Control type="text" value={tareaEditada} onChange={handleChange} />
        ) : (
          tarea.tarea
        )}
        <div>
          {editando ? (
            <Button variant="success" onClick={editarDatosTarea}>
              Guardar
            </Button>
          ) : (
            <Button variant="warning" onClick={editarDatosTarea}>
              Editar
            </Button>
          )}
          <Button variant="danger" onClick={eliminarTarea}>
            Borrar
          </Button>
        </div>
      </ListGroup.Item>
    </div>
  );
};

export default ItemTarea;
