let items = [
  { id: "1", text: "Item 1 (from JS)", done: false },
  { id: "2", text: "Item 2 (from JS)", done: true },
  { id: "3", text: "Item 3 (from JS)", done: false },
  { id: "4", text: "Item 4 (from JS)", done: true }
];

let lastId = "4";

let done; // boolean indicating if only todo (`done === false`) of done items should be shown

// initializes
const initializeMainPage = () => {
  const formElement = document.querySelector("form");

  // Step 3 - create variable `inputElement` with query-d result for `input` (see: https://www.w3schools.com/jsref/met_document_queryselector.asp)
  const inputElement = formElement.querySelector("input");

  // Step 4 - attach a `submit` event listener that invokes `addTodoItem` with the `.value` of `inputElement`;
  //          add `event.preventDefault();` to prevent reloading of the web page
  formElement.addEventListener("submit", event => {
    addTodoItem(inputElement.value);
    event.preventDefault();
  });

  // Step 5 - assign value of false to the `done` value
  done = false;

  renderTodoItems(); // renders html elements for `items`
};

const renderTodoItems = () => {
  const unorderedListElement = document.querySelector("ul");
  unorderedListElement.innerHTML = ""; // clears all existing children

  // Step 6 - create variable `filteredItems` by filtering `items` array on value of `done`
  const filteredItems = items.filter(item => item.done === done);

  // Step 7 - create a loop that does `unorderedListElement.appendChild(`..`)` with result of `createTodoItemElement` function
  for (let item of filteredItems) {
    unorderedListElement.appendChild(createTodoItemElement(item.id, item.text));
  }
};

// Steps 8 .. 9: see `done-items.html`

const initializeDoneItemsPage = () => {
  // Step 10 - assign value of false to the `done` value
  done = true;

  renderTodoItems(); // renders html elements for `items`
};

const createTodoItemElement = (id, text) => {
  const inputTypeCheckboxElement = document.createElement("input");
  inputTypeCheckboxElement.type = "checkbox";
  inputTypeCheckboxElement.addEventListener("click", event => {
    const itemId = event.target.parentNode.dataset.id;
    toggleDonePropOfTodoItem(itemId);
  });

  const spanElement = document.createElement("span");
  spanElement.textContent = text;

  const buttonElement = document.createElement("button");
  buttonElement.textContent = "x";
  buttonElement.addEventListener("click", event => {
    const itemId = event.target.parentNode.dataset.id;
    removeTodoItem(itemId);
  });

  const result = document.createElement("li");
  result.dataset.id = id;
  result.appendChild(inputTypeCheckboxElement);
  result.appendChild(spanElement);
  result.appendChild(buttonElement);
  return result;
};

const addTodoItem = text => {
  lastId = String(Number(lastId) + 1); // generate a new `lastId` value
  items.push({ id: lastId, text, done: false }); // adds a new item to the `todoItems` array
  renderTodoItems(); // re-render todo items
};

const toggleDonePropOfTodoItem = id => {
  const item = items.find(item => item.id === id); // find todo item for id
  item.done = !item.done;
  renderTodoItems(); // re-render todo items
};

const removeTodoItem = id => {
  items = items.filter(item => item.id !== id); // reassign a new `items` array with the todo item with id
  renderTodoItems(); // re-render todo items
};
