const API_URL = import.meta.env.VITE_API_TAREAS;

export const obtenerTareas = async () => {
  try {
    const respuesta = await fetch(API_URL);
    const listadoTareas = await respuesta.json();
    return listadoTareas;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const obtenerTarea = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const tarea = await respuesta.json();
    return tarea;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const agregarTarea = async (tarea) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    });

    if (!respuesta.ok) {
      throw new Error('Error al agregar la tarea');
    }

    const nuevaTarea = tarea
    return nuevaTarea;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const eliminarTarea = async (tareaId) => {
  try {
    const respuesta = await fetch(`${API_URL}/${tareaId}`, {
      method: 'DELETE',
    });

    if (!respuesta.ok) {
      throw new Error('Error al eliminar la tarea');
    }

    const tareaEliminada = await respuesta.json();
    return tareaEliminada;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarTarea = async (tareaId, tareaEditada) => {
  try {
    const respuesta = await fetch(`${API_URL}/${tareaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tareaEditada),
    });

    if (!respuesta.ok) {
      throw new Error('Error al editar la tarea');
    }

    const tareaActualizada = await respuesta.json();
    return tareaActualizada;
  } catch (error) {
    console.error(error);
    throw error;
  }
}