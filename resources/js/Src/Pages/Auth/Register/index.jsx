import { Link, router } from "@inertiajs/react";
import React from "react";
import style from "./index.module.css";
import { useForm } from "react-hook-form";
import ErrorComponent from "../../../Shared/Component/Error";

const RegisterPage = ({ direct, api, errors }) => {

  const { handleSubmit, register } = useForm();
  
  const handleRegister = (value) => {
    router.post(api.register, value);
  }

  return (
    <div className={style['auth-register--main-wrap']}>
      <h1 className={style['auth-register--title']}> Sign Up </h1>
      <form className={style['auth-register--form-wrap']} onSubmit={handleSubmit(handleRegister)}>
        <label className={style['auth-register--form-element--wrap']}>
          <span>Name</span>
          <input
            {...register("name")}
            className={style['auth-register--form-element--input']}
            type="text"
          />
          { errors.name && (<ErrorComponent content={errors.name}/>) }
        </label>

        <label className={style['auth-register--form-element--wrap']}>
          <span>Email</span>
          <input
            {...register("email")}
            className={style['auth-register--form-element--input']}
            type="email"
          />
          { errors.email && (<ErrorComponent content={errors.email}/>) }
        </label>

        <label className={style['auth-register--form-element--wrap']}>
          <span>Password</span>
          <input
            {...register("password")}
            className={style['auth-register--form-element--input']}
            type="password"
          />
          { errors.password && (<ErrorComponent content={errors.password}/>) }
        </label>

        <div className={style['auth-register--button-wrap']}>
          <button type="submit" className={style['auth-register--form-element--submit']}>
            Register
          </button>

          <h6 className={style['auth-register--divider']}> OR </h6>
          
          <Link href={direct.login} className={style['auth-register--link--register']}>
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage;