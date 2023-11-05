import style from "./index.module.css";
import FilterProvider from "../../../Shared/Context/Filter/Filter.context";
import AppWidget from "../../../Shared/Widget"
import HistorySection from "./Section/History.section";
import FilterSection from "./Section/Filter.section";
import BalanceSection from "./Section/Balance.section";
import { router } from "@inertiajs/react";

const TransactionHistoryPage = ({ direct, transactionType, data }) => {
  const handleLogout = () => {
    router.delete(direct.logout);
  }

  return (
    <div className={style['history-transaction--main-wrap']}>
      <BalanceSection calculate={data.calculate} balance={data.balance} />

      <div className={style['history-transaction--history-content--wrap']}>
        <FilterSection direct={direct} transactionType={transactionType} />
        <HistorySection history={data.history} count={data.paginate.total} />
      </div>

      <button className={style['history-transaction--logout-button']} onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

TransactionHistoryPage.layout = (pages) => (
  <FilterProvider>
    { AppWidget(pages) }
  </FilterProvider>
)

export default TransactionHistoryPage;