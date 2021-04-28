export const state = {
  quote: {},
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
async function sendJSON(url) {
  try {
    // const sendBody = {
    //   client_id: "e2a1a3259b4e13eb324bed61340b546664670e648a62d7d36e59cad11e394db7",
    //   client_secret: "ba2ab029005f6468580b52e0c5e3a558f327a15749fd3475351a256fc013d259",
    //   grant_type: "client_credentials",
    // };
    const sendObject = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Host: "api.producthunt.com",
        Authorization: "Bearer Msind3P7wu1bkZpH7FbyFdYbKsdzMQw1zKIJsr-0Y44",
      },
    };
    const rawQuote = await fetch(url, sendObject);
    console.log(rawQuote);
    const jsonQuote = await rawQuote.json();
    if (!rawQuote.ok) throw new Error(`Joke not found 😭`);
    return jsonQuote;
  } catch (err) {
    throw err;
  }
}

async function getProduct() {
  try {
    const jsonProduct = await sendJSON("https://api.producthunt.com/v1/posts");
    const newProduct = jsonProduct.value;
    insertQuote(newProduct);
    console.log(jsonProduct);
  } catch (err) {
    alert(err);
    console.error(err);
  }
}

getProduct();

async function getJoke() {
  try {
    const jsonJoke = await getJSON("https://api.chucknorris.io/jokes/random");
    const newJoke = jsonJoke.value;
    insertQuote(newJoke);
  } catch (err) {
    alert(err);
    console.error(err);
  }
}

export async function getAdvice() {
  try {
    const jsonAdvice = await getJSON("https://api.adviceslip.com/advice");
    const { advice: newAdvice } = jsonAdvice.slip;
    const { id } = jsonAdvice.slip;
    state.quote[id] = newAdvice;
  } catch (err) {
    console.error(err);
  }
}

function insertQuote(quote) {
  document.querySelector(".product_list").insertAdjacentHTML("beforeend", `<div>${quote}</div>`);
}
