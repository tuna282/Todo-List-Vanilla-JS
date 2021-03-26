/* Todo app javascript */
const button = document.querySelector('#submit-button');
const toDoSection = document.querySelector('.toDos');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const toDos = [];

const updateDom = () => {
  toDoSection.innerHTML = '';
  toDos.forEach((toDo, index) => {
    if (toDo.toDoDone) {
      toDoSection.innerHTML += `
      <article class="toDo toDoDone" id="${index}">
        <header>
          ${toDo.title}
        </header>
        <p>
          ${toDo.description}
        </p>
        <button class="remove-button">Remove</button>
      </article>`;
    } else {
      toDoSection.innerHTML += `
      <article class="toDo" id="${index}">
        <header>
          ${toDo.title}
        </header>
        <p>
          ${toDo.description}
        </p>`;
    }
  });
};

const updateToDoIds = () => {
  toDos.forEach((toDo, index) => {
    toDo.id = index;
  });
};

const findToDoIndex = (id) => {
  let i;
  toDos.forEach((toDo, index) => {
    if (toDo.id === id) {
      i = index;
    }
  });
  return i;
};

const addToDo = (titleValue, descriptionValue, toDoDone) => {
  const newToDo = {
    title: titleValue,
    description: descriptionValue,
    toDoDone,
  };
  toDos.push(newToDo);
};

const addToDoAppendBeginning = (titleValue, descriptionValue, toDoDone) => {
  const newToDo = {
    title: titleValue,
    description: descriptionValue,
    toDoDone,
  };
  toDos.unshift(newToDo);
};

const removeToDo = (id) => {
  toDos.forEach((toDo, index) => {
    if (toDo.id === id) {
      toDos.splice(index, 1);
    }
  });
};

const helperForToDoIndexUpdate = (id) => {
  const toDoToBeMoved = findToDoIndex(id);
  const storeTitle = toDos[toDoToBeMoved].title;
  const storeDescription = toDos[toDoToBeMoved].description;
  return [storeTitle, storeDescription];
};

const helperForToDoIndexUpdate2 = (id, storedData, toDoMethodToBeUsed) => {
  removeToDo(id);
  if (toDoMethodToBeUsed === 'addToDo') {
    addToDo(storedData[0], storedData[1], true);
  } else {
    addToDoAppendBeginning(storedData[0], storedData[1], false);
  }
  updateDom();
  updateToDoIds();
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  const titleValue = title.value;
  const descriptionValue = description.value;
  if (!title.value || !description.value) {
    alert('Please fill in both the title and the description fields');
    return;
  }
  title.value = '';
  description.value = '';
  addToDoAppendBeginning(titleValue, descriptionValue, false);
  updateDom();
  updateToDoIds();
});

toDoSection.addEventListener('click', (e) => {
  if (e.target.tagName === 'SECTION') {
    return;
  }
  if (e.target.tagName === 'BUTTON') {
    removeToDo(parseInt(e.target.parentNode.id, 10));
    updateDom();
    updateToDoIds();
    return;
  }
  if ((e.target.tagName === 'P' || e.target.tagName === 'HEADER') && !e.target.parentNode.classList.contains('toDoDone')) {
    const id = parseInt(e.target.parentNode.id, 10);
    const storedData = helperForToDoIndexUpdate(id);
    helperForToDoIndexUpdate2(id, storedData, 'addToDo');
  } else if ((e.target.tagName === 'P' || e.target.tagName === 'HEADER')) {
    const id = parseInt(e.target.parentNode.id, 10);
    const storedData = helperForToDoIndexUpdate(id);
    helperForToDoIndexUpdate2(id, storedData, 'addToDoAppendBeginning');
  } else if (!e.target.classList.contains('toDoDone')) {
    const id = parseInt(e.target.id, 10);
    const storedData = helperForToDoIndexUpdate(id);
    helperForToDoIndexUpdate2(id, storedData, 'addToDo');
  } else {
    const id = parseInt(e.target.id, 10);
    const storedData = helperForToDoIndexUpdate(id);
    helperForToDoIndexUpdate2(id, storedData, 'addToDoAppendBeginning');
  }
});
