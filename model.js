export const state = {
  productRandom: {},
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

const randomNumberGenerator = function () {
  return Math.floor(Math.random() * 2700) + 1;
};

export async function getProductList() {
  try {
    const jsonProduct = await getJSONAuthentication(
      `https://api.producthunt.com/v1/posts?days_ago=${randomNumberGenerator()}`
    );
    state.productRandom = jsonProduct.posts.map((product) => {
      return {
        productName: product.name,
        id: product.id,
        date: product.created_at,
        url: product.discussion_url,
        tagline: product.tagline,
        img: product.thumbnail.image_url,
        creator: product.user.name,
      };
    });
    console.log(jsonProduct);
    console.log(state);
  } catch (err) {
    alert(err);
    console.error(err);
  }
}
