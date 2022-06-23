import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Country } from "../types/country";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import Image from "./image";
import { PaginatorTemplate } from "primereact/paginator";
import _ from "lodash";

const N_ROWS = 15;
const TABLE_SESSION_STORAGE_KEY = "country-table-settings";

interface CountriesTableProps {
  data: Country[];
}

const CountriesTable: React.FunctionComponent<CountriesTableProps> = (
  props
) => {
  // PrimeNG Table including pagination and global search field to filter
  // Countries. Custom templating in order to depict the flags alongside the
  // country names.

  const [filter, setFilter] = useState<DataTableFilterMeta | undefined>(
    undefined
  );
  const [globalFilter, setGlobalFilter] = useState("");

  const data = props.data;

  useEffect(() => clearFilter(), []);

  const clearFilter = () => {
    setFilter({
      global: { value: "", matchMode: FilterMatchMode.STARTS_WITH },
    });
    setGlobalFilter("");
  };

  let onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filter = { ...filter };
    (_filter["global"] as DataTableFilterMetaData).value = value;

    setFilter(_filter);
  };

  onGlobalFilterChange = _.debounce(onGlobalFilterChange, 300);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          className="p-button-outlined mr-4"
          onClick={clearFilter}
          disabled={!globalFilter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            onKeyUp={onGlobalFilterChange}
            placeholder="Search..."
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const rowTemplate = (rowData: Country) => {
    return (
      <React.Fragment>
        <Image url={rowData.flagUrl} />
        <span>{rowData.country}</span>
      </React.Fragment>
    );
  };

  const paginatorTemplate: PaginatorTemplate =
    "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink";

  return (
    <div className="flex flex-column w-11 md:w-10 lg:w-8 xl:w-6">
      <DataTable
        value={data}
        rows={N_ROWS}
        size="small"
        stateKey={TABLE_SESSION_STORAGE_KEY}
        stateStorage="session"
        responsiveLayout="scroll"
        scrollHeight="400px"
        globalFilterFields={["country"]}
        header={header}
        filters={filter}
        emptyMessage="No countries found."
        paginatorTemplate={paginatorTemplate}
        scrollable
        stripedRows
        paginator
      >
        <Column
          header="Country"
          body={rowTemplate}
          sortField="country"
          sortable
        ></Column>
      </DataTable>
    </div>
  );
};

export default CountriesTable;
