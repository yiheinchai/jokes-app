import * as model from "./model.js";
import ProductListView from "./productListView.js";

// function generateProductList() {
//   model.getProduct();
// }

async function controlProductList(e) {
  e.preventDefault();
  const apiURL = document.querySelector(".query_string").value;
  model.getProduct(apiURL);
}

const init = function () {
  ProductListView.addHandlerRender(controlProductList);
};
