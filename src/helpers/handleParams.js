export const handleSearchCitiesParams = (cities) => {
  if (cities[0] === "All") return "";

  const quantityCities = cities.length;
  
  let result = "cities_like=(?:";

  cities.forEach((item, idx) => {
    result += item

    if (idx !== quantityCities-1) {
      result += "|";
    }
  });

  return result + ")";
}

export const extractSearchCitiesParams = (citiesParams) => {
  const regex = /^cities_like=\(\?:([^()]+)\)$/;
  const match = citiesParams.match(regex);

  if (match) {
    const citiesPart = match[1];

    const cities = citiesPart.split('|');

    return cities;
  } 
  else {
    return [];
  }
}

export const extractSearchTagsParams = (tagsParams) => {
  if (tagsParams === "") return "";

  const array = tagsParams.split('=');
  
  return array[1];
}