import { useContext } from "react";
import PaginationComponent from "../../../../Shared/Component/Pagination";
import { FilterContext } from "../../../../Shared/Context/Filter/Filter.context";
import { dateFormat } from "../../../../Shared/Helper/Date.helper";
import { numberFormat } from "../../../../Shared/Helper/Number.helper";
import style from "./History.module.css";

const HistorySection = ({ history, count }) => {
  const [filter, setFilter] = useContext(FilterContext);

  const handlePaginateChange = (value) => {
    setFilter({
      page: value,
    })
  }

  return (
    <div className={style['history-transaction--history-content--list']}>
      <div className={style['history-transaction--history-content--title-wrap']}>
        <h1 className="font-bold text-xl w-1/2">History Transaction</h1>
        <div className="w-1/2 text-end">
          <PaginationComponent current={filter.page} total={count} onChange={handlePaginateChange}/>
        </div>
      </div>
      <div className={style['history-transaction--history-content--list-wrap']}>
          { history.map((value) => (
            <div key={`key-${value.id}`} className={style['history-transaction--history-content--list-item']}>
                <div className={style['history-transaction--history-content--sub-content']}>
                  <span>Date</span>
                  <span>{dateFormat(value.created_at)}</span>
                </div>
                <div className={style['history-transaction--history-content--sub-content']}>
                  <span>Type</span>
                  <span>{value.type}</span>
                </div>
                <div className={style['history-transaction--history-content--sub-content']}>
                  <span>Amount</span>
                  <span>{numberFormat(value.amount)}</span>
                </div>
                <div className={style['history-transaction--history-content--sub-content']}>
                  <span>Note</span>
                  <span>{value.note || "-"}</span>
                </div>
            </div>
          )) }
      </div>
  </div>
  )
}

export default HistorySection;