export const state = {
  productList: [],
  bookmarks: [],
  productCurrent: {},
};

async function getJSON(url) {
  try {
    const rawQuote = await fetch(url);
    const jsonQuote = await rawQuote.json();
    if (!rawQuote.ok) throw new Error(`Joke not found 😭`);
    return jsonQuote;
  } catch (err) {
    throw err;
  }
}
async function getJSONAuthentication(url) {
  try {
    // const sendBody = {
    //   client_id: "e2a1a3259b4e13eb324bed61340b546664670e648a62d7d36e59cad11e394db7",
    //   client_secret: "ba2ab029005f6468580b52e0c5e3a558f327a15749fd3475351a256fc013d259",
    //   grant_type: "client_credentials",
    // };
    const getAuthentication = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Host: "api.producthunt.com",
        Authorization: "Bearer Msind3P7wu1bkZpH7FbyFdYbKsdzMQw1zKIJsr-0Y44",
      },
    };
    const rawProduct = await fetch(url, getAuthentication);
    console.log(rawProduct);
    const jsonProduct = await rawProduct.json();
    if (!rawProduct.ok) throw new Error(`Joke not found 😭`);
    return jsonProduct;
  } catch (err) {
    throw err;
  }
}

const randomNumberGenerator = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min + 1;
};

function getInputDates() {
  const startDate = document.querySelector("#start").valueAsNumber
    ? new Date(document.querySelector("#start").valueAsNumber)
    : new Date();
  const endDate = document.querySelector("#end").valueAsNumber
    ? new Date(document.querySelector("#end").valueAsNumber)
    : new Date("2013-12-10");
  return [startDate, endDate];
}

function getDaysDifference(date1, date2) {
  if (date1 > date2) {
    return Math.floor((date1 - date2) / (60 * 60 * 24 * 1000));
  }
  if (date2 > date1) {
    return Math.floor((date2 - date1) / (60 * 60 * 24 * 1000));
  }
}

export async function getSearchedProduct() {
  try {
    const searchInput = document.querySelector(".search__field").value.split(" ").join("-");
    console.log(searchInput);
    const jsonProduct = await getJSONAuthentication(
      `https://api.producthunt.com/v1/posts/all?search[slug]=${searchInput}`
    );
    const [modifiedProduct] = jsonProduct.posts.map((product) => {
      return {
        productName: product.name,
        id: product.id,
        date: product.created_at,
        url: product.discussion_url,
        tagline: product.tagline,
        img_large: product.user.image_url["264px"],
        img: product.thumbnail.image_url,
        maker_name: product.user.name,
        maker_title: product.user.headline,
        maker_profile_url: product.user.profile_url,
        twitter: product.user.twitter_username,
        username: product.user.username,
        comments: product.comments_count,
        upvotes: product.votes_count,
        screenshot: product.screenshot_url["300px"],
        topics: product.topics.map((obj) => obj.name),
      };
    });
    state.productCurrent = modifiedProduct;
  } catch (err) {}
}

export async function getProductList() {
  try {
    const [startInputDate, endInputDate] = getInputDates();
    if (endInputDate > startInputDate)
      throw new Error("Start date cannot be later than end date! 📅❌");
    const randomDateMilli = randomNumberGenerator(startInputDate.getTime(), endInputDate.getTime());

    const randomDate = new Date(randomDateMilli);

    const randomDateFormatted = `${randomDate.getFullYear()}-${`${
      randomDate.getMonth() + 1
    }`.padStart(2, "0")}-${`${randomDate.getDate()}`.padStart(2, "0")}`;
    const jsonProduct = await getJSONAuthentication(
      `https://api.producthunt.com/v1/posts?day=${randomDateFormatted}`
    );
    state.productList = jsonProduct.posts.map((product) => {
      return {
        productName: product.name,
        id: product.id,
        date: product.created_at,
        url: product.discussion_url,
        tagline: product.tagline,
        img_large: product.user.image_url["264px"],
        img: product.thumbnail.image_url,
        maker_name: product.user.name,
        maker_title: product.user.headline,
        maker_profile_url: product.user.profile_url,
        twitter: product.user.twitter_username,
        username: product.user.username,
        comments: product.comments_count,
        upvotes: product.votes_count,
        screenshot: product.screenshot_url["300px"],
        topics: product.topics.map((obj) => obj.name),
      };
    });
    console.log(jsonProduct);
    console.log(state);
  } catch (err) {
    alert(err);
    console.error(err);
  }
}

export function loadProduct(id) {
  state.productCurrent = state.productList.find((ele) => ele.id == id);
}

export function loadBookmark(id) {
  state.productCurrent = state.bookmarks.find((ele) => ele.id == id);
}

export function addBookmark() {
  state.productCurrent.bookmark = true;
  state.bookmarks.push(state.productCurrent);
  console.log(state.bookmarks);
  persistBookmarks();
}

export function deleteBookmark() {
  const id = state.productCurrent.id;
  state.productCurrent.bookmark = false;
  state.bookmarks.forEach((obj, i) => {
    if (obj.id == id) state.bookmarks.splice(i, 1);
  });
  persistBookmarks();
}

function persistBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
