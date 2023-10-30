import { isUserInputValid } from "./utilities.js";
import { handleDelete } from "./deteleTask.js";
import { handleCancel, handleEdit, handleUpdate } from "./editUpdateTask.js";
import { handleDone } from "./doneTask.js";

const createUpdateInput = (todoToEdit) => {
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todoToEdit.value;
  return inputField;
};

const createButton = (content) => {
  const newButton = document.createElement("button");
  newButton.textContent = content;

  return newButton;
};

const createDoneButton = (taskId) => {
  const doneButton = createButton("Done");

  doneButton.addEventListener("click", () => {
    handleDone(taskId);
  });

  return doneButton;
};

const createEditButton = (taskId) => {
  const editButton = createButton("Edit");

  editButton.addEventListener("click", () => {
    handleEdit(taskId);
  });

  return editButton;
};
const createDeleteButton = (taskId) => {
  const deleteButton = createButton("Delete");

  deleteButton.addEventListener("click", () => handleDelete(taskId));

  return deleteButton;
};

export const createTaskElement = (task) => {
  const li = document.createElement("li");

  if (task.isEditing) {
    createEditableTaskElements(li, task);
    return li;
  }

  createNonEditableTaskElements(li, task);
  return li;
};

const createEditableTaskElements = (li, task) => {
  const inputField = createUpdateInput(task);
  const updateButton = createButton("Update");
  const cancelButton = createButton("Cancel");

  updateButton.addEventListener("click", () =>
    handleUpdate(task.id, inputField.value)
  );
  cancelButton.addEventListener("click", () => handleCancel(task.id));

  li.appendChild(inputField);
  li.appendChild(updateButton);
  li.appendChild(cancelButton);

  updateButton.classList.add("doneButtonStyle");
  cancelButton.classList.add("deleteButtonStyle");

  if (isUserInputValid(task.error)) {
    appendErrorToTask(li, task.error);
  }
};

const createNonEditableTaskElements = (li, task) => {
  li.innerHTML = task.value;

  const deleteButton = createDeleteButton(task.id);
  const editButton = createEditButton(task.id);
  const doneButton = createDoneButton(task.id);

  deleteButton.classList.add("deleteButtonStyle");
  editButton.classList.add("editButtonStyle");
  doneButton.classList.add("doneButtonStyle");

  if (task.isDone) {
    li.style.textDecoration = "line-through";
    editButton.style.display = "none";
    doneButton.style.display = "none";
  }

  li.appendChild(deleteButton);
  li.appendChild(editButton);
  li.appendChild(doneButton);
};

export const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.classList.add("errorText");
  updateError.textContent = error;
  li.appendChild(updateError);
};
