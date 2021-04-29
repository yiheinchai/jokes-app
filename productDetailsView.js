class ProductDetailsView {
  render(data) {
    this._data = data;
    document.querySelector(".detail").innerHTML = "";
    const markup = this.generateMarkup();
    document.querySelector(".detail").insertAdjacentHTML("beforeend", markup);
  }
  addHandlerRender(handler) {
    window.addEventListener("hashchange", handler);
  }

  addHandlerBookmarks(handler) {
    document.querySelector(".btn-bookmark").addEventListener("click", handler);
  }

  generateMarkup() {
    return `<div class="detail__title">
      <div class="detail__logo">
        <img
          class="detail__logo-img"
          src="${this._data.img}"
        />
      </div>
      <h2 class="detail__name">${this._data.productName} <span><a href="#${
      this._data.id
    }" class="btn-bookmark"> ${
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
    }</button> </a></h2>
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
        <h1 class="detail__maker__title">Maker Info</h1>
        <h4 class="detail__maker__name">${this._data.maker_name}</h4>
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
        <a href="${this._data.maker_profile_url}" class="detail__maker-btn" target="_blank"
          >Maker's Product Hunt Profile</a
        >
      </div>
      <div class="detail__hunt">
        <div class="detail__hunt__info">
          <h5 class="detail__hunt__info-title">Comments</h5>
          <div class="detail__hunt__info-number">${this._data.thiscomments}</div>
        </div>
        <div class="detail__hunt__info">
          <h5 class="detail__hunt__info-title">Upvotes</h5>
          <div class="detail__hunt__info-number">${this._data.upvotes}</div>
        </div>
      </div>
      <div class="detail__screenshots">
        <h1 class="detail__screeshots__title">Screenshots</h1>
        <img
          class="detail__screenshots__img"
          width="500px"
          height="500px"
          src="${this._data.screenshot}"
        />
      </div>
      <div class="btn-bookmark>Hi</div>
    </div>`;
  }
}

export default new ProductDetailsView();
