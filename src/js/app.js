import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";

document.addEventListener("DOMContentLoaded", e => {
  initApp();
  const form = formUI.form;

  // Events
  form.addEventListener("submit", e => {
    e.preventDefault();
    onFormSubmit();
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.ShortCitiesList);
  }

  async function onFormSubmit() {
    // збираємо дані з інпутів форм
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // CODE, CODE, 2020-02, 2020-03
    console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });
  }
});
