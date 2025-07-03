import Swal from "sweetalert2";

// Msj de exito
export const showSuccess = (message = "Operación realizada correctamente.") => {
    Swal.fire({
        icon: "success",
        title: "¡Operación exitosa!",
        text: message,
        confirmButtonColor: "#9c7ae0",
    });
};

// Msj de advertencia
export const showWarning = (message = "Por favor, verifique los campos.") => {
    Swal.fire({
        icon: "warning",
        title: "Atención",
        text: message,
        confirmButtonColor: "#f6ad55",
    });
};

// Msj de error
export const showError = (message = "Ha ocurrido un error inesperado.") => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "#e53e3e",
    });
};

//Confirmación (por ejemplo, eliminar producto o favorito)
export const confirmAction = async ({
    title = "¿Estás seguro?",
    text = "Esta acción no se puede deshacer.",
    confirmButtonText = "Sí, continuar",
}) => {
    const result = await Swal.fire({
        icon: "warning",
        title,
        text,
        showCancelButton: true,
        confirmButtonColor: "#9c7ae0",
        cancelButtonColor: "#cfcfcf",
        confirmButtonText,
        cancelButtonText: "Cancelar",
    });
    return result.isConfirmed;
};
