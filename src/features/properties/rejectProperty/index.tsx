import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon } from "assets";

interface RejectData {
  reason: string;
}

const initialValues: RejectData = {
  reason: "",
};

const schema = yup
  .object({
    reason: yup.string().required("Required"),
  })
  .required();

interface RejectPropertyModalProps {
  show: boolean;
  close: () => void;
  submit: (data: RejectData) => void;
}

const RejectPropertyModal: React.FC<RejectPropertyModalProps> = ({
  show,
  close,
  submit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<RejectData> = (data) => submit(data);

  return (
    <Modal show={show} close={close}>
      <div className={styles.header}>
        <h1 className={styles.header__ttl}>Reject Property</h1>

        <CloseIcon
          className={styles.header__close}
          role="button"
          onClick={close}
        />
      </div>

      <form>
        <Input
          label="Why are you rejecting this property?"
          placeholder="Enter reason"
          type="text"
          parentClassName={styles.input}
          required
          validatorMessage={errors.reason?.message}
          name="reason"
          register={register}
        />
        <Button
          className={styles.btn}
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Reject
        </Button>
      </form>
    </Modal>
  );
};

export { RejectPropertyModal };
