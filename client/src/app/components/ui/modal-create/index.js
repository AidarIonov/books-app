import { showError, showSuccessMsg } from '../../../shared/lib/alerts';
import { booksService } from '../../../service/books.service';
import { errorCatch } from '../../../utils/errorCatch';

export const onCreateBookSubmit = (_, event) => {
  const rawFormData = Object.fromEntries(new FormData(event.target));
  const formData = {
    ...rawFormData,
    publishYear: Number(rawFormData.publishYear),
    pagesNumber: Number(rawFormData.pagesNumber),
    genres: rawFormData.genres.split().map((x) => x.trim()),
  };

  setTimeout(async () => {
    try {
      if (formData) {
        await booksService.create(formData);
        showSuccessMsg('Success', () => {
          window.location.href = './';
        });
      }
    } catch (err) {
      showError(errorCatch(err));
    }
  }, 80);
};

