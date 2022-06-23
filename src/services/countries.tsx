import { Country } from "../types/country";

export function loadCountries(): Promise<Country[]> {
  // Could have used Axios, but definitely not necessary since no API-keys or
  // additional data needs to be provided.
  return fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
    .then((res) => res.json())
    .then((res) => {
      const data = res.data ?? [];

      if (data.length) {
        return data.map((d: any) => {
          return {
            country: d.name ?? "",
            flagUrl: d.flag ?? "",
          };
        });
      }
    })
    .catch(() => []);
}
