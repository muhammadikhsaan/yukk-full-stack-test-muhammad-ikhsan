import { createContext, useEffect, useState } from "react";
import { getQueryString, setUrl } from "../../Helper/Url.helper";
import { router } from "@inertiajs/react";

export const defaultValue = [{}, (value) => {}];

export const FilterContext = createContext(defaultValue);

const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(getQueryString());

  useEffect(() => {
    () => setFilter({});
  }, []);

  const handleFilterChange = (value) => {
    setFilter((prev) => {
      const filter = {
        ...prev,
        ...value,
        ...(value.page ? {} : { page: null })
      };

      router.visit(setUrl(window.location.href, filter));
      return filter;
    });
  }

  return (
    <FilterContext.Provider value={[filter, handleFilterChange]}>
      { children }
    </FilterContext.Provider>
  )
}

export default FilterProvider;