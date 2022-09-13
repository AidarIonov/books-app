export const layout = () => {
  return `
      <div class="modal-create" id="modal-create">
          <div class="modal-create__wrapper">
              <div class="modal-create__container animate animate__zoomIn" id="modal-create-container">
                  <div class="modal-create__content">
                      <button class="btn modal-create__btn-close" id="modal-create-btn-close" type="button">
                          X
                      </button>
                      <h2 class="modal-create__title">Add Book</h2>
                      <form class="default-form modal-create-form" id="modal-create-form" autocomplete="off">
                          <div class="default-form__field">
                              <label>
                                  <span>Title:</span>
                                  <input
                                      class="default-form__input field-common"
                                      id="modal-create-field-name"
                                      type="text"
                                      name="name"
                                      placeholder="Title"
                                  >
                                  <span class="error-message modal-create-form__err" id="modal-create-field-name-err"></span>
                              </label>
                          </div>
                          <div class="default-form__field">
                              <label>
                                  <span>Author:</span>
                                  <input
                                      class="default-form__input field-common"
                                      id="modal-create-field-author"
                                      type="text"
                                      name="author"
                                      placeholder="Author"
                                  >
                                  <span class="error-message modal-create-form__err" id="modal-create-field-author-err"></span>
                              </label>
                          </div>
                          <div class="default-form__field">
                              <label>
                                  <span>Publish year:</span>
                                  <input
                                      class="default-form__input field-common"
                                      type="number"
                                      pattern="\d{4}"
                                      name="publishYear"
                                      placeholder="Publish year"
                                  >
                              </label>
                          </div>
                          <div class="default-form__field">
                              <label>
                                  <span>Publish house:</span>
                                  <input 
                                      class="default-form__input field-common"
                                      type="text"
                                      name="publishHouse"
                                      placeholder="Publish house"
                                  >
                              </label>
                          </div>
                          <div class="default-form__field">
                              <label>
                                  <span>Pages:</span>
                                  <input
                                      class="default-form__input field-common"
                                      type="number"
                                      name="pagesNumber"
                                      placeholder="Pages"
                                  >
                              </label>
                          </div>
                          <div class="default-form__field">
                              <label>
                                  <span>Genres:</span>
                                  <input
                                      class="default-form__input field-common"
                                      type="text"
                                      name="genres"
                                      placeholder="Genres"
                                  >
                              </label>
                          </div>
                          <div class="default-form__field">
                              <label>
                                  <span>Language:</span>
                                  <input
                                      class="default-form__input field-common"
                                      type="text"
                                      name="originalLanguage"
                                      placeholder="Original language"
                                  >
                              </label>
                          </div>
                          <div class="modal-create-form__buttons">
                              <button class="btn default-form__btn-submit" type="submit">
                                  Save
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  `;
};
