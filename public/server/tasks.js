document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("taskForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const task = {
        title: form.title.value,
        description: form.description.value,
        status: form.status.value
      };
      console.log("JS file is connected");

      console.log("New Task:", task);
    });
  });
  