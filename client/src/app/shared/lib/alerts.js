import Swal from 'sweetalert2';

export const showError = (err) => {
  void Swal.fire({
    customClass: {
      container: 'app-alert',
    },
    icon: 'error',
    html: `<p class="alert-text">${err}</p>`,
    buttonsStyling: false,
    confirmButtonText: `<button class = "btn alert-btn">OK</button>`,
  });
};

export const showSuccessMsg = (message, onClose = null) => {
  Swal.fire({
    customClass: {
      container: 'app-alert',
    },
    icon: 'success',
    html: `<p class="alert-text">${message}</p>`,
    buttonsStyling: false,
    confirmButtonText: `<button class = "btn alert-btn">OK</button>`,
  }).then((result) => onClose?.());
};

export const deleteDialog = async (onDelete) => {
  try {
    const result = await Swal.fire({
      customClass: {
        container: 'app-alert',
      },
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#287F9A',
      cancelButtonColor: '#D30808',
      confirmButtonText: `Yes, delete it!`,
    });

    if (result.isConfirmed) {
      onDelete();
      await Swal.fire({
        customClass: {
          container: 'app-alert',
        },
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
        confirmButtonColor: '#287F9A',
      });
    }
  } catch (err) {
    showError(err);
  }
};
