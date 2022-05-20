import API from "./fetchCountries";
import cardElem from "./card.hbs";
import listElem from "./list.hbs";
// all modules
import Notiflix from "notiflix";
// one by one
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "./css/styles.css";

var debounce = require("lodash.debounce");
const DEBOUNCE_DELAY = 300;

const input = document.querySelector("input");
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");

input.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const name = e.target.value.trim();
  countryInfo.innerHTML = "";
  if (name) {
    API.fetchCountries(name).then(renderUserList).catch(error);
  }
}

function renderUserList(country) {
  countryList.innerHTML = "";
  countryInfo.innerHTML = "";
  if (country.length > 10) {
    return Notify.success(
      "Too many matches found. Please enter a more specific name."
    );
  }
  if (country.length >= 2) {
    const markupList = listElem(country);
    countryInfo.innerHTML = markupList;
  }
  if (country.length === 1) {
    const markupCard = cardElem(country);
    countryList.innerHTML = markupCard;
  }
  //console.log(markup)
}

function error() {
  return Notify.failure("Oops, there is no country with that name");
}
