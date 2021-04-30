import * as model from "./model.js";
import ProductListView from "./productListView.js";
import ProductDetailsView from "./productDetailsView.js";
import BookmarksView from "./bookmarksView.js";

// function generateProductList() {
//   model.getProduct();
// }

async function controlProductList(e) {
  await model.getProductList();

  ProductListView.render(model.state.productList);
}

async function controlProductDetails() {
  const id = window.location.hash.slice(1);
  console.log("Product Details activated");
  model.loadProduct(id);
  if (!model.state.productCurrent) model.loadBookmark(id);
  ProductDetailsView.render(model.state.productCurrent);
}

function controlBookmarks(e) {
  if (!e.target.closest(".btn-bookmark")) return;
  if (model.state.productCurrent.bookmark) model.deleteBookmark();
  else model.addBookmark();
  ProductDetailsView.render(model.state.productCurrent);
  BookmarksView.render(model.state.bookmarks);
}

function controlReloadBookmarks() {
  BookmarksView.render(model.state.bookmarks);
}

async function controlSearch() {
  await model.getSearchedProduct();
  ProductDetailsView.render(model.state.productCurrent);
}

const init = function () {
  ProductListView.addHandlerRender(controlProductList);
  ProductDetailsView.addHandlerRender(controlProductDetails);
  ProductDetailsView.addHandlerSearch(controlSearch);
  ProductDetailsView.addHandlerBookmarks(controlBookmarks);
  BookmarksView.addHandlerRender(controlReloadBookmarks);
  //   BookmarksView.addHandlerRender(controlViewBookmarks);
};

init();
