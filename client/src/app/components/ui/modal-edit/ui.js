import './index.scss';


export const layoutEdit = (bookInfo) => {
  return `
        <h2 class="modal-edit__title">Edit Book</h2>
        
        <form class="default-form modal-edit-form" id="modal-edit-form" autocomplete="off">
            <div class="default-form__field">
                <label>
                    <span>Title:</span>
                    <input
                        class="field-common"
                        id="modal-create-field-name"
                        type="text"
                        name="name"
                        required
                        value="${bookInfo.name}"
                        placeholder="Title"
                    >
                    <span class="error-message modal-edit-form__err" id="modal-create-field-name-err"></span>
                </label>
            </div>
            <div class="default-form__field">
                <label>
                    <span>Author:</span>
                    <input
                        class="field-common"
                        id="modal-create-field-author"
                        type="text"
                        name="author"
                        required
                        value="${bookInfo.author}"
                        placeholder="Author"
                    >
                <span class="error-message modal-edit-form__err" id="modal-create-field-author-err"></span>
                </label>
            </div>
            <div class="default-form__field">
                <label>
                    <span>Publish year:</span>
                    <input
                        class="field-common"
                        type="number"
                        pattern="\d{4}"
                        name="publishYear"
                        value="${bookInfo.publishYear}"
                        placeholder="Publish year"
                    >
                </label>
            </div>
            <div class="default-form__field">
                <label>
                    <span>Publish house:</span>
                    <input 
                        class="field-common"
                        type="text"
                        name="publishHouse"
                        value="${bookInfo.publishHouse}"
                        placeholder="Publish house"
                    >
                </label>
            </div>
            <div class="default-form__field">
                <label>
                    <span>Pages:</span>
                    <input
                        class="field-common"
                        type="number"
                        name="pagesNumber"
                        value="${bookInfo.pagesNumber}"
                        placeholder="Pages"
                    >
                </label>
            </div>
            <div class="default-form__field">
                <label>
                    <span>Genres:</span>
                    <input
                        class="field-common"
                        type="text"
                        name="genres"
                        value="${bookInfo.genres.join(', ')}"
                        placeholder="Genres"
                    >
                </label>
            </div>
            <div class="default-form__field">
                <label>
                    <span>Language:</span>
                    <input
                        class="field-common"
                        type="text"
                        name="originalLanguage"
                        value="${bookInfo.originalLanguage}"
                        placeholder="Original language"
                    >
                </label>
            </div>
            <div class="modal-edit-form__buttons">
                <button 
                    class="btn default-form__btn-submit modal-edit-form__btn-remove"
                    id="modal-edit-btn-remove"
                    type="button"
                >
                    Remove
                </button>
                <button class="btn default-form__btn-submit" type="submit">
                    Save
                </button>
            </div>
        </form>

  `;
};
