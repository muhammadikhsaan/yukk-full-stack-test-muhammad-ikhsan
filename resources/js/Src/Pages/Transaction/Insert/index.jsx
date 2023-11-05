import { Link, router } from "@inertiajs/react";
import style from "./index.module.css";
import { useForm } from "react-hook-form";
import ErrorComponent from "../../../Shared/Component/Error";

const TransactionInsertPage = ({ direct, api, errors, transactionType }) => {

  const { register, handleSubmit } = useForm();

  const handleAddTransaction = (value) => {
    router.post(api.insert, value);
  };
  
  return (
    <div className={style['insert-transaction--main-wrap']}>
      <form className={style['insert-transaction--form-element']} onSubmit={handleSubmit(handleAddTransaction)}>
        <label className={style['insert-transaction--form-element--wrap']}>
          <span>Type</span>
          <select {...register('type')} className={style['insert-transaction--form-element--input']}>
            <option value="" hidden>Select Type</option>
            {
              transactionType.map((val) => (
                <option key={val} value={val}>{ val.toLowerCase() }</option>
              ))
            }
          </select>
          { errors.type && (<ErrorComponent content={errors.type}/>) }
        </label>

        <label className={style['insert-transaction--form-element--wrap']}>
          <span>Amount</span>
          <input {...register('amount')} className={style['insert-transaction--form-element--input']} type="number" min={1} />
          { errors.amount && (<ErrorComponent content={errors.amount}/>) }
        </label>

        <label className={style['insert-transaction--form-element--wrap']}>
          <span>Note</span>
          <input {...register('note')} className={style['insert-transaction--form-element--input']} type="text" />
          { errors.note && (<ErrorComponent content={errors.note}/>) }
        </label>

        <button className={style['insert-transaction--form-element--button']} type="submit">
          Submit
        </button>
      </form>
      <div className="absolute left-10 top-5">
        <Link href={direct.history}> {'<'} Back </Link>
      </div>
    </div>
  )
}

export default TransactionInsertPage;