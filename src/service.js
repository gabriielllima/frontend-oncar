export const getVehiclesAll = async (vehicle) =>
  fetch(
    `http://localhost:3333/vehicle/?vehicle_name=${vehicle ? vehicle : ""}`
  ).then((res) => res.json());

export const getVehicleById = async (id) =>
  fetch(`http://localhost:3333/vehicle/${id}`).then((res) => res.json());

export const postVehicle = async (data) =>
  fetch(`http://localhost:3333/vehicle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const putVehicle = async (id, data) =>
  fetch(`http://localhost:3333/vehicle/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const debounceEvent = (fn, fn2, wait = 1000, time) => (...args) => {
  clearTimeout(time, (time = setTimeout(() => fn(...args, fn2), wait)));
};

export const handleKeyUp = (event, fn) => {
  fn(getVehiclesAll(event.target.value).then((users) => users));
};

export const openModal = (idTag) => {
  var modal = document.getElementById("myModal");
  var buttonUpdated = document.getElementById("button-updated-submit");

  var buttonAdd = document.getElementById("button-add-submit");

  modal.style.display = "block";

  if (idTag === "add") {
    buttonAdd.setAttribute("style", "display:block;");
    buttonUpdated.setAttribute("style", "display:none;");
  } else {
    buttonAdd.setAttribute("style", "display:none;");
    buttonUpdated.setAttribute("style", "display:block;");
  }

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};
