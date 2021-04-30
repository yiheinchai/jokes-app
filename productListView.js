class ProductListView {
  _data;

  render(data) {
    this._data = data;
    document.querySelector(".list").innerHTML = "";
    const markup = this.generateMarkup();
    document.querySelector(".list").insertAdjacentHTML("beforeend", markup);
  }

  addHandlerRender(handler) {
    document.querySelector(".header__generate").addEventListener("click", handler);
  }

  generateMarkup() {
    return this._data
      .map((product) => {
        return `
        <a href="#${product.id}" class="list__item"
          ><img
            class="list__icon"
            src="${product.img}"
          />
          <div class="list__data">
            <h4 class="list__title">${product.productName}</h4>
            <div class="list__tagline">${product.tagline}</div>
          </div>
        </a>
            `;
      })
      .join("");
  }
}

export default new ProductListView();
