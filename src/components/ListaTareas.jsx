import { ListGroup } from "react-bootstrap";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({ conjuntoTareas, borrarTarea, editarTarea }) => {
  return (
    <div>
      <ListGroup>
        {conjuntoTareas.map((tarea, indice) => (
          <ItemTarea
            key={indice}
            tarea={tarea}
            borrarTarea={borrarTarea}
            editarTarea={editarTarea}
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default ListaTareas;