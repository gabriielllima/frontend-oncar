import {
  debounceEvent,
  getVehiclesAll,
  getVehicleById,
  handleKeyUp,
  openModal,
  postVehicle,
  putVehicle,
} from "./service";
async function setVehicles() {
  var vehicles = [];

  const result = await getVehiclesAll();
  result.forEach((element) => {
    vehicles.push(element);
  });

  populate(result);
  function getVehicles(id) {
    getVehicleById(id).then((response) => {
      const vehicle = document.getElementById("vehicle");
      const brand = document.getElementById("brand");
      const year = document.getElementById("year");
      const description = document.getElementById("description");
      const id = document.getElementById("id");
      vehicle.value = response[0].vehicle;
      brand.value = response[0].brand;
      year.value = response[0].year;
      description.value = response[0].description;
      id.value = response[0].id;
    });
  }

  function handleOpenEditVehicle(event) {
    const id_details = document.getElementById("id-details");

    if (Number(id_details.value)) {
      openModal();
      getVehicles(Number(id_details.value));
    } else {
      openModal();
      getVehicles(event.target.id);
    }
  }

  try {
    const filterVehicleById = vehicles;
    const vehicle = document.getElementById("vehicle-details");
    const brand = document.getElementById("brand-details");
    const year = document.getElementById("year-details");
    const description = document.getElementById("description-details");
    const id_details = document.getElementById("id-details");
    vehicle.innerHTML = filterVehicleById[0].vehicle;
    brand.innerHTML = filterVehicleById[0].brand;
    year.innerHTML = filterVehicleById[0].year;
    description.innerHTML = filterVehicleById[0].description;
    id_details.value = filterVehicleById[0].id;
  } catch (error) {
    console.log(error);
  }

  function handleDetailsVehicle(event) {
    if (event.target.tagName === "LI") {
      const id = event.target.id;
      const filterVehicleById = vehicles.filter(
        (vehicle) => vehicle.id === Number(id)
      );
      const vehicle = document.getElementById("vehicle-details");
      const brand = document.getElementById("brand-details");
      const year = document.getElementById("year-details");
      const description = document.getElementById("description-details");
      const id_details = document.getElementById("id-details");
      vehicle.innerHTML = filterVehicleById[0].vehicle;
      brand.innerHTML = filterVehicleById[0].brand;
      year.innerHTML = filterVehicleById[0].year;
      description.innerHTML = filterVehicleById[0].description;
      id_details.value = filterVehicleById[0].id;
    }
  }

  function populate(vehicle_list) {
    const list = document.querySelector("div#list");
    var listChildAll = document.getElementById("list");
    while (listChildAll.childNodes.length > 0) {
      listChildAll.removeChild(list.childNodes[0]);
    }
    const ul = document.createElement("ul");
    ul.classList.add("list-ul");
    vehicle_list.forEach((vehicle) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      const p2 = document.createElement("p");
      const div = document.createElement("div");
      const h3 = document.createElement("h2");
      const icon = document.createElement("i");

      h3.innerHTML = vehicle.brand;
      p.innerHTML = vehicle.vehicle;
      p2.innerHTML = vehicle.year;
      icon.innerHTML = "edit";

      li.classList.add("list-li");
      icon.classList.add("large", "icon-li", "material-icons");
      p.classList.add("title-blue");
      p2.classList.add("title-small");

      li.setAttribute("id", vehicle.id);
      icon.setAttribute("id", vehicle.id);

      icon.addEventListener("click", handleOpenEditVehicle);
      li.addEventListener("click", handleDetailsVehicle);

      div.append(h3, p, p2);
      li.append(div, icon);
      ul.append(li);
      list.append(li);
    });
  }

  var form = document.getElementById("form-id");

  document
    .getElementById("button-updated-submit")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const vehicle = document.getElementById("vehicle");
      const brand = document.getElementById("brand");
      const year = document.getElementById("year");
      const description = document.getElementById("description");
      const sold = document.getElementById("sold");
      const id = document.getElementById("id");

      const data = {
        vehicle: vehicle.value,
        brand: brand.value,
        year: year.value,
        description: description.value,
        sold: sold.checked,
      };
      putVehicle(id.value, data)
        .then((response) => {
          const modal = document.getElementById("myModal");
          if (response.success) {
            alert("Atualizado com sucesso");
            modal.style.display = "none";
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao atualizar!");
        });

      form.submit();
    });
  document
    .getElementById("button-add-submit")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const vehicle = document.getElementById("vehicle");
      const brand = document.getElementById("brand");
      const year = document.getElementById("year");
      const description = document.getElementById("description");
      const sold = document.getElementById("sold");

      const data = {
        vehicle: vehicle.value,
        brand: brand.value,
        year: year.value,
        description: description.value,
        sold: sold.checked,
      };

      postVehicle(data)
        .then((response) => {
          const modal = document.getElementById("myModal");
          if (response.success) {
            alert("Cadastrado com sucesso");
            modal.style.display = "none";
            location.reload();

            return;
          }
          alert("Erro ao cadastrar!");
        })
        .catch((error) => {
          alert("Erro ao cadastrar!");
        });
    });
  document.getElementById("add").addEventListener("click", function () {
    const vehicle = document.getElementById("vehicle");
    const brand = document.getElementById("brand");
    const year = document.getElementById("year");
    const description = document.getElementById("description");
    vehicle.value = "";
    brand.value = "";
    year.value = "";
    description.value = "";

    openModal("add");
  });

  document.getElementById("input-search").addEventListener(
    "keyup",
    debounceEvent(
      handleKeyUp,
      async (result) => {
        const response = await result;
        vehicles = [];
        response.forEach((vehicle) => {
          vehicles.push(vehicle);
        });
        populate(response);
      },
      500
    )
  );

  document
    .getElementById("edit-details-submit")
    .addEventListener("click", handleOpenEditVehicle);
}
setVehicles();
