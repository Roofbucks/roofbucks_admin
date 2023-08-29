import { Button } from "components/button";
import styles from "./styles.module.scss";

interface EmptyTableProps {
  Vector: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  heading: string;
  text: string;
  button?: {
    text: string;
    onClick: () => void;
    Vector?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    className?: string;
  };
  className?: string;
}

const EmptyTable: React.FC<EmptyTableProps> = ({ Vector, heading, text, button, className }) => {
  return (
    <section className={`${styles.empty} ${className}`}>
      <Vector className={styles.empty__img} />
      <p className={styles.empty__ttl}>{heading}</p>
      <p className={styles.empty__txt}>{text} </p>
      {button ? (
        <Button
          className={`${styles.empty__btn} ${button.className}`}
          type="primary"
          onClick={button.onClick}
        >
          {button.Vector && <button.Vector />}
          {button.text}
        </Button>
      ) : (
        ""
      )}
    </section>
  );
};

export { EmptyTable };
