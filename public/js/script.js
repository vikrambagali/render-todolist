 function validateForm() {
    const input = document.getElementById('todo-input').value.trim();
    if (input === "") {
      alert("Task cannot be empty!");
      return false;
    }
    return true;
  }