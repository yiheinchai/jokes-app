import * as model from "./model.js";

function generateQuoteList(listLength) {
  Array.from({ length: listLength }, () => {
    model.getAdvice();
  });
}

async function controlQuotes() {
  generateQuoteList(20);
}

function init() {}
