import style from "./index.module.css";

const ErrorComponent = ({ content }) => {
  return (
    <span className={style['error-component--label']}> { content } </span>
  )
}

export default ErrorComponent;