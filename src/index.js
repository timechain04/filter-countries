import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import createCountryList from './js/country-list-card.js';
import createCountryInfo from './js/country-info-card.js';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))
refs.inputEl.focus()

function onSearch(event) {
    let inputValue = event.target.value.trim()
    if (inputValue !== '') {
        fetchCountries(inputValue)
        .then(renderCountriesData)
        .catch(onFetchError)
    } else {
        refs.countryInfo.innerHTML = ''
        refs.countryList.innerHTML = ''
    }
}

function renderCountriesData(countries) {
    if (countries.length > 11) {
        refs.countryInfo.innerHTML = ''
        refs.countryList.innerHTML = ''
        Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (countries.length > 1 && countries.length <= 10){
        refs.countryInfo.innerHTML = ''
        const markup = countries.map(country => createCountryList(country)).join('')
        refs.countryList.innerHTML = markup
    } else {
        refs.countryList.innerHTML = ''
        const markup = countries.map(country => createCountryInfo(country)).join('')
        refs.countryInfo.innerHTML = markup
    }
}

function onFetchError(error) {
    refs.countryInfo.innerHTML = ''
    refs.countryList.innerHTML = ''
    Notify.failure("Oops, there is no country with that name")
}
