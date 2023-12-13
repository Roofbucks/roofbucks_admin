import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon } from "assets";
import { useEffect } from "react";

interface RentData {
  rent: string;
}

const initialValues: RentData = {
  rent: "",
};

const schema = yup
  .object({
    rent: yup
      .string()
      .required("Required")
      .matches(/\d/, "Enter a valid number"),
  })
  .required();

interface UpdateRentModalProps {
  show: boolean;
  close: () => void;
  submit: (data: RentData) => void;
  value: number;
}

const UpdateRentModal: React.FC<UpdateRentModalProps> = ({
  show,
  close,
  submit,
  value,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RentData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset({ rent: `${value}` });
  }, [value]);

  const onSubmit: SubmitHandler<RentData> = (data) => submit(data);

  return (
    <Modal show={show} close={close}>
      <div className={styles.header}>
        <h1 className={styles.header__ttl}>Update Rent</h1>

        <CloseIcon
          className={styles.header__close}
          role="button"
          onClick={close}
        />
      </div>

      <form>
        <Input
          label="What is the new annual rent for this property? in (NGN)"
          placeholder="Enter rent per annum"
          type="number"
          parentClassName={styles.input}
          required
          validatorMessage={errors.rent?.message}
          name="rent"
          register={register}
        />
        <Button
          className={styles.btn}
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export { UpdateRentModal };
