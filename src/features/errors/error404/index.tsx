import { Error404Svg } from "assets";
import { Button } from "components";
import styles from "./styles.module.css";

const Error404UI = () => {
  return (
    <section className={styles.wrapper} >
      <Error404Svg />
      <h1>No results found</h1>
      <p>We couldn't find the page you requested, you should go back</p>
      <Button type={"primary"} onClick={() => {}}>Go Home</Button>
    </section>
  );
};

export { Error404UI };
