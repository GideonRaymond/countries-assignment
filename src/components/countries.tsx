import { useEffect, useState } from "react";
import { loadCountries } from "../services/countries";
import { Country } from "../types/country";
import CountriesTable from "./countries-table";
import Loader from "./loader";

function Countries(): JSX.Element {
  // Simple main page including a Table to displat the list of
  // countries, alongside an overlay-loader.

  const [countries, setCountries] = useState<Country[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    setIsInitializing(true);
    loadCountries().then((res) => {
      setCountries(res);
      setIsInitializing(false);
    });
  }, []);

  return (
    <>
      <Loader isLoading={isInitializing} />
      <CountriesTable data={countries} />
    </>
  );
}

export default Countries;
