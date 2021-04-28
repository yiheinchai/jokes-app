class ProductDetailsView {
  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    document.querySelector(".details").insertAdjacentHTML("beforeend", markup);
  }
  addHandlerRender(handler) {
    window.addEventListener("hashchange", handler);
  }
}

export default new ProductDetailsView();
