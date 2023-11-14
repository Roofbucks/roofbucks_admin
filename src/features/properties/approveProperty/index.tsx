import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon } from "assets";

interface ApproveData {
  rent: string;
}

const initialValues: ApproveData = {
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

interface ApprovePropertyModalProps {
  show: boolean;
  close: () => void;
  submit: (data: ApproveData) => void;
}

const ApprovePropertyModal: React.FC<ApprovePropertyModalProps> = ({
  show,
  close,
  submit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApproveData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<ApproveData> = (data) => submit(data);

  return (
    <Modal show={show} close={close}>
      <div className={styles.header}>
        <h1 className={styles.header__ttl}>Approve Property</h1>

        <CloseIcon className={styles.header__close} role="button" onClick={close} />
      </div>

      <form>
        <Input
          label="What is the rent percentage for this property?"
          placeholder="Enter percentage"
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
          Approve
        </Button>
      </form>
    </Modal>
  );
};

export { ApprovePropertyModal };
