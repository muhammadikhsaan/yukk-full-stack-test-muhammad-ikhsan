import React from "react";
import style from "./index.module.css";
import { Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import ErrorComponent from "../../../Shared/Component/Error";

const LoginPage = ({ direct, api, errors }) => {

  const { handleSubmit, register } = useForm();

  const handleLodgin = (value) => {
    router.post(api.login, value);
  }

  return (
      <div className={style['auth-login--main-wrap']}>
        <h1 className={style['auth-login--title']}> Sign In </h1>
        <form className={style['auth-login--form-wrap']} onSubmit={handleSubmit(handleLodgin)}>
          <label className={style['auth-login--form-element--wrap']}>
            <span>Email / Username</span>
            <input
              {...register("email")}
              className={style['auth-login--form-element--input']}
              type="email"
            />
            { errors.email && (<ErrorComponent content={errors.email}/>) }
          </label>

          <label className={style['auth-login--form-element--wrap']}>
            <span>Password</span>
            <input
              {...register("password")}
              className={style['auth-login--form-element--input']}
              type="password"
            />
            { errors.password && (<ErrorComponent content={errors.password}/>) }
          </label>

          <div className={style['auth-login--button-wrap']}>
            <button type="submit" className={style['auth-login--form-element--submit']}>
              Login
            </button>

            <h6 className={style['auth-login--divider']}> OR </h6>
            
            <Link href={direct.register} className={style['auth-login--link--register']}>
              Register
            </Link>
          </div>
        </form>
      </div>
  )
}

export default LoginPage;