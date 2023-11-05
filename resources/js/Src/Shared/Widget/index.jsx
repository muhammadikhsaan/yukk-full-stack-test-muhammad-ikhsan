import style from "./index.module.css";

const AppWidget = (children) => {
  return (
    <div className={style['app-widget--main-wrapper']}>
      {children}
    </div>
  )
}

export default AppWidget;