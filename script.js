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

async function getAdvice() {
  const rawAdvice = await fetch("https://api.adviceslip.com/advice");
  const jsonAdvice = await rawAdvice.json();
  const { advice: newAdvice } = jsonAdvice.slip;
  console.log(newAdvice);
  insertQuote(newAdvice);
}

function insertQuote(quote) {
  document
    .querySelector(".quotes_container")
    .insertAdjacentHTML("beforeend", `<div>${quote}</div>`);
}

getJoke();
getAdvice();
