import { numberFormat } from "../../../../Shared/Helper/Number.helper";
import style from "./Balance.module.css";

const BalanceSection = ({ calculate, balance }) => {
  return (
    <div className={style["history-transaction--balance-content--wrap"]}>
      <div
        className={style["history-transaction--balance-content--second-wrap"]}
      >
        <h1 className={style["history-transaction--balance-content--title"]}>
          Balances
        </h1>
        <div
          className={style["history-transaction--balance-content--box-content"]}
        >
          <h1 className={style["history-transaction--balance-content--label"]}>
            Amount
          </h1>
          <p className={style["history-transaction--balance-content--value"]}>
            <span
              className={style["history-transaction--balance-content--unit"]}
            >
              IDR
            </span>{" "}
            {numberFormat(balance || 0)},-
          </p>
        </div>
      </div>
      <div
        className={style["history-transaction--balance-content--second-wrap"]}
      >
        <h1 className={style["history-transaction--balance-content--title"]}>
          Top Up
        </h1>
        <div
          className={style["history-transaction--balance-content--box-content"]}
        >
          <h1 className={style["history-transaction--balance-content--label"]}>
            Amount of transaction
          </h1>
          <p className={style["history-transaction--balance-content--value"]}>
            {numberFormat(calculate.TOPUP.amount)}{" "}
            <span
              className={style["history-transaction--balance-content--unit"]}
            >
              Transaction
            </span>
          </p>
        </div>
        <div
          className={style["history-transaction--balance-content--box-content"]}
        >
          <h1 className={style["history-transaction--balance-content--label"]}>
            Amount of money
          </h1>
          <p className={style["history-transaction--balance-content--value"]}>
            <span
              className={style["history-transaction--balance-content--unit"]}
            >
              IDR
            </span>{" "}
            {numberFormat(calculate.TOPUP.money)},-
          </p>
        </div>
      </div>
      <div
        className={style["history-transaction--balance-content--second-wrap"]}
      >
        <h1 className={style["history-transaction--balance-content--title"]}>
          Transaction
        </h1>
        <div
          className={style["history-transaction--balance-content--box-content"]}
        >
          <h1 className={style["history-transaction--balance-content--label"]}>
            Amount of transaction
          </h1>
          <p className={style["history-transaction--balance-content--value"]}>
            {numberFormat(calculate.TRANSACTION.amount)}{" "}
            <span
              className={style["history-transaction--balance-content--unit"]}
            >
              Transaction
            </span>
          </p>
        </div>
        <div
          className={style["history-transaction--balance-content--box-content"]}
        >
          <h1 className={style["history-transaction--balance-content--label"]}>
            Amount of money
          </h1>
          <p className={style["history-transaction--balance-content--value"]}>
            <span
              className={style["history-transaction--balance-content--unit"]}
            >
              IDR
            </span>{" "}
            {numberFormat(calculate.TRANSACTION.money)},-
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
