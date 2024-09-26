/* eslint-disable prettier/prettier */
import Swal from "sweetalert2";

export const confirm = async (title='Are you sure?', icon='warning')=>{
  return await Swal.fire({
    title: title,
    // text: "You won't be able to revert this!",
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success"
      // });

      return true
    }

    return false
  });
}

export const error = (msg)=>{
  Swal.fire({
    title: 'Error',
    text: msg,
    icon: 'error',
  });
}

export const success = (msg='')=>{
  Swal.fire({
    title: 'Success',
    text: msg,
    icon: 'success',
  });
}
