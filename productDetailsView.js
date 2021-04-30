class ProductDetailsView {
  render(data) {
    if (!data) return;
    this._data = data;
    document.querySelector(".detail").innerHTML = "";
    const markup = this.generateMarkup();
    document.querySelector(".detail").insertAdjacentHTML("beforeend", markup);
  }
  addHandlerRender(handler) {
    ["load", "hashchange"].forEach((ev) => window.addEventListener(ev, handler));
  }

  addHandlerBookmarks(handler) {
    document.querySelector(".detail").addEventListener("click", handler);
  }

  addHandlerSearch(handler) {
    document.querySelector(".search__btn").addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  generateMarkup() {
    return `
    <div class="detail__title">
      <div class="detail__logo">
        <img
          class="detail__logo-img"
          src="${this._data.img}"
        />
      </div>
      <div class="detail__name">
      <h2 class="detail__name-text">${this._data.productName}</h2>
      <button class="btn-bookmark"> ${
        this._data.bookmark
          ? `<img
              width="30px"
              height="30px"
              src="https://static.thenounproject.com/png/809340-200.png"
            >
          `
          : `
            <img
              width="30px"
              height="30px"
              src="https://static.thenounproject.com/png/1591085-200.png"
            >
          `
      }</button>
      </div>
      <h4 class="detail__tagline">${this._data.tagline}</h4>
      <div class="detail__topics">
        <h4 class="detail__topics__title">Topics</h4>
        ${this._data.topics.reduce((acc, ele) => {
          return (acc += `<div class="detail__topics__element">${ele}</div>`);
        }, "")}
      </div>
    </div>
    <div class="detail__description">
      <div class="detail__maker">
        <h1 class="detail__maker__title title-large">Hunter Info</h1>
        <h4 class="detail__maker__name title-name">${this._data.maker_name}</h4>
        <div class="detail__maker__info">
          <img class="detail__maker__info-icon" width="25px" height="25px" src="https://static.thenounproject.com/png/2166694-200.png" />
          <div class="detail__maker__info-text">${this._data.maker_title}</div>
        </div>
        <div class="detail__maker__info">
          <img class="detail__maker__info-icon" width ="25px" height="25px" src="https://static.thenounproject.com/png/2568647-200.png" />
          <div class="detail__maker__info-text">${this._data.twitter}</div>
        </div>
        <div class="detail__maker__info">
          <img class="detail__maker__info-icon" width="25px" height="25px" src="https://static.thenounproject.com/png/321988-200.png" />
          <div class="detail__maker__info-text">${this._data.username}</div>
        </div>
        <a href="${
          this._data.maker_profile_url
        }" class="detail__maker-btn btn__info" target="_blank"
          >Hunter Profile</a
        >
      </div>
      <div class="detail__product">
        <div class="title-large">Product Info</div>
        <div class="detail__product__tagline">
          <div class="title-medium">Tagline</div>
          <div class="detail__product__tagline-text">${this._data.tagline}</div>
        </div>
        <div class="detail__product__performance">
          <div class="title-medium">Performance</div>
          <div class="detail__product__metrics">
            <div class="detail__product__info">
              <div class="detail__product__title-small title-small">Upvotes</div>
              <div class="detail__product__info-number">${this._data.upvotes}</div>
            </div>
            <div class="detail__product__info">
              <div class="detail__product__title-small title-small">Comments</div>
              <div class="detail__product__info-number">${this._data.comments}</div>
            </div>
          </div>
        </div>
        <div class="detail__product__date">
          <div class="title-medium">Date Added</div>
          <div class="detail__product__date-date">${this._data.date.slice(0, 10)}</div>
        </div>
        <div class="detail__product__link">
        <a href="${this._data.url}" class="detail__maker-btn btn__info" target="_blank"
          >Product Page</a
        >
        </div>
      </div>
      <div class="detail__screenshots">
        <div class="screenshot__title-large title-large">Screenshots</div>
        <img
          class="screenshot__img"
          src="${this._data.screenshot}"
        />
      </div>
      <div class="btn-bookmark>Hi</div>
    </div>`;
  }
}

export default new ProductDetailsView();
