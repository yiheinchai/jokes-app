import * as model from "./model.js";
import ProductListView from "./productListView.js";
import ProductDetailsView from "./productDetailsView.js";
import BookmarksView from "./bookmarksView.js";

// function generateProductList() {
//   model.getProduct();
// }

async function controlProductList(e) {
  e.preventDefault();
  await model.getProductList();

  ProductListView.render(model.state.productList);
}

async function controlProductDetails() {
  const id = window.location.hash.slice(1);
  model.loadProduct(id);
  ProductDetailsView.render(model.state.productCurrent);
  ProductDetailsView.addHandlerBookmarks(controlBookmarks);
}

function controlBookmarks() {
  console.log(model.state.productCurrent.bookmark);
  if (model.state.productCurrent.bookmark) model.deleteBookmark();
  else model.addBookmark();
  console.log(model.state.productCurrent.bookmark);
  ProductDetailsView.render(model.state.productCurrent);
  BookmarksView.render(model.state.bookmarks);
}

const init = function () {
  ProductListView.addHandlerRender(controlProductList);
  ProductDetailsView.addHandlerRender(controlProductDetails);
  //   BookmarksView.addHandlerRender(controlViewBookmarks);
};

init();
