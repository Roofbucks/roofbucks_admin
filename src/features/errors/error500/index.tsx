import { Error500Svg } from "assets";
import { Button } from "components";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Error500UI = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.wrapper}>
      <Error500Svg />
      <h1>Internal Server Error</h1>
      <p>Ooops! Something went wrong, you should go back</p>
      <Button type={"primary"} onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </section>
  );
};

export { Error500UI };
