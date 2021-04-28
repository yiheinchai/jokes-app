class ProductListView {
  _data;

  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    document.querySelector(".product_list").insertAdjacentHTML("beforeend", markup);
  }

  addHandlerRender(handler) {
    document.querySelector(".submit_query").addEventListener("click", handler);
  }

  generateMarkup() {
    return this._data
      .map((product) => {
        return `
        <div class="product_list_item">
        <a class="product_list_item_link" href="${product.url}"><img width="40px" height="40px" src="${product.img}">${product.productName}</a>
        </div>
            `;
      })
      .join("");
  }
}

export default new ProductListView();
