import { layout } from './ui';
import './bookCard.scss';

export class BookCard extends HTMLElement {
  #shadowRoot;
  #onCardClick;
  #onDelete;
  #onFavoriteToggle;

  constructor(onCardClick, onDelete, onFavoriteToggle) {
    super();
    // this.#onCardClick = onCardClick;
    this.#onDelete = onDelete;
    this.#onFavoriteToggle = onFavoriteToggle;
    this.#shadowRoot = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['is-favorite'];
  }

  get props() {
    return {
      id: this.getAttribute('id'),
      title: this.getAttribute('title'),
      author: this.getAttribute('author'),
      isFavorite: this.getAttribute('is-favorite') === 'true',
    };
  }

  connectedCallback() {
    this.#shadowRoot.innerHTML = this.#getLayout();
    this.#setButtonHandlers();
  }

  #setButtonHandlers() {
    const btnDelete = this.#shadowRoot.getElementById('btn-trash');
    btnDelete.addEventListener('click', (e) => {
      e.stopPropagation();
      this.#onDelete(this.props);
    });

    const btnFavorite = this.#shadowRoot.getElementById('btn-favorite');
    btnFavorite.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (await this.#onFavoriteToggle(this.props)) {
        this.setAttribute('is-favorite', String(!this.props.isFavorite));
      }
    });

    // const rootContainer = this.#shadowRoot.getElementById('book-card');
    // rootContainer.onclick = () => this.#onCardClick(this.props);
  }

  disconnectedCallback() {
    const btnTrash = this.#shadowRoot.getElementById('btn-trash');
    const btnFavorite = this.#shadowRoot.getElementById('btn-favorite');
    const bookCard = this.#shadowRoot.getElementById('book-card');
    bookCard.onclick = btnTrash.onclick = btnFavorite.onclick = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'is-favorite') {
      const btnFavorite = this.#shadowRoot.getElementById('btn-favorite-icon');
      btnFavorite?.setAttribute('fill', this.props.isFavorite ? 'red' : 'gray');
    }
  }

  #getLayout() {
    return layout(
      this.props.title,
      this.props.author,
      this.props.id,
      this.props.isFavorite
    );
  }
}

window.customElements.define('book-card', BookCard);
