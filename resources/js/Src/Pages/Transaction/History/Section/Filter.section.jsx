import { useContext } from "react";
import style from "./Filter.module.css";
import { FilterContext } from "../../../../Shared/Context/Filter/Filter.context";
import { Link } from "@inertiajs/react";

const startDateFilter = new Date(new Date().setMonth(new Date().getMonth() - 1))
  .toISOString()
  .substring(0, 10);
const endDateFilter = new Date().toISOString().substring(0, 10);

const FilterSection = ({ direct, transactionType }) => {
  console.log(endDateFilter, startDateFilter);

  const [filter, setFilter] = useContext(FilterContext);

  const handleChangeFilter = (e) => {
    setFilter({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={
        style["history-transaction--history-content--filter-and-direct"]
      }
    >
      <div
        className={
          style["history-transaction--history-content--filter-content"]
        }
      >
        <label className={style["history-transaction--form-element--wrap"]}>
          <span>Search</span>
          <input
            className={style["history-transaction--form-element--input"]}
            type="text"
            name="keyword"
            onChange={handleChangeFilter}
            value={filter.keyword}
          />
        </label>
        <label className={style["history-transaction--form-element--wrap"]}>
          <span>Start Date</span>
          <input
            className={style["history-transaction--form-element--input"]}
            type="date"
            name="startDate"
            onChange={handleChangeFilter}
            value={filter.startDate || startDateFilter}
          />
        </label>
        <label className={style["history-transaction--form-element--wrap"]}>
          <span>End Date</span>
          <input
            className={style["history-transaction--form-element--input"]}
            type="date"
            name="endDate"
            onChange={handleChangeFilter}
            value={filter.endDate || endDateFilter}
          />
        </label>
        <label className={style["history-transaction--form-element--wrap"]}>
          <span>Type</span>
          <select
            name="type"
            value={filter.type || ""}
            className={style["history-transaction--form-element--input"]}
            onChange={handleChangeFilter}
          >
            <option value="">all</option>
            {transactionType.map((val) => (
              <option key={val} value={val}>
                {val.toLowerCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className={
          style["history-transaction--history-content--direct-content"]
        }
      >
        <Link
          className={
            style["history-transaction--history-content--direct-button"]
          }
          href={direct.insert}
        >
          Add Transaction
        </Link>
      </div>
    </div>
  );
};

export default FilterSection;
