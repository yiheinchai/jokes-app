async function getJokes() {
  const rawJoke = await fetch("https://api.chucknorris.io/jokes/random");
  const jsonJoke = await rawJoke.json();
  const newJoke = jsonJoke.value;
  console.log(newJoke);
  insertJoke(newJoke);
}

function insertJoke(joke) {
  document.querySelector(".jokes_container").insertAdjacentHTML("beforeend", `${joke}`);
}

getJokes();
