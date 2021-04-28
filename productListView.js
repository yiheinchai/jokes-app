class ProductListView {
  _data;

  render(data) {
    this._data = data;
  }

  addHandlerRender(handler) {
    document.querySelector(".submit_query").addEventListener("click", handler);
  }

  generateMarkup() {
    this._data.map((quote) => {
      return `
            
            `;
    });
  }
}

export default new ProductListView();
