import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon } from "assets";
import { useEffect } from "react";

interface ApproveData {
  cost: string;
}

const initialValues: ApproveData = {
  cost: "",
};

const schema = yup
  .object({
    cost: yup
      .string()
      .required("Required")
      .matches(/\d/, "Enter a valid number"),
  })
  .required();

interface AddMarketValueModalProps {
  show: boolean;
  close: () => void;
  submit: (value: number) => void;
  value: number | undefined;
  currency: string;
}

const AddMarketValueModal: React.FC<AddMarketValueModalProps> = ({
  show,
  close,
  submit,
  value,
  currency,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApproveData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    value && reset({ cost: `${value}` });
  }, [value]);

  const onSubmit: SubmitHandler<ApproveData> = (data) =>
    submit(parseInt(data.cost));

  return (
    <Modal show={show} close={close}>
      <div className={styles.header}>
        <h1 className={styles.header__ttl}>
          {value ? "Update" : "Add"} Market Value
        </h1>

        <CloseIcon
          className={styles.header__close}
          role="button"
          onClick={close}
        />
      </div>

      <form>
        <Input
          label={`What is the current market value for this property? (${currency})`}
          placeholder={`Enter market value in ${currency}`}
          type="number"
          parentClassName={styles.input}
          required
          validatorMessage={errors.cost?.message}
          name="cost"
          register={register}
        />
        <Button
          className={styles.btn}
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Update
        </Button>
      </form>
    </Modal>
  );
};

export { AddMarketValueModal };
