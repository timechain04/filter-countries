const URL_COUNTRY = 'https://restcountries.com/v3.1'

export const fetchCountries = name => {
    const url = `${URL_COUNTRY}/name/${name}?fields=name,capital,population,flags,languages`
        return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
}