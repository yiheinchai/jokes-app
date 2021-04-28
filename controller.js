import * as model from "./model.js";
import ProductListView from "./productListView.js";

// function generateProductList() {
//   model.getProduct();
// }

async function controlProductList(e) {
  e.preventDefault();
  await model.getProductList();

  ProductListView.render(model.state.productRandom);
}

const init = function () {
  ProductListView.addHandlerRender(controlProductList);
};

init();
