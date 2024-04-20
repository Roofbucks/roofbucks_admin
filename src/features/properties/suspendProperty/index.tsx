import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon } from "assets";

interface SuspendData {
  reason: string;
}

const initialValues: SuspendData = {
  reason: "",
};

const schema = yup
  .object({
    reason: yup.string().required("Required"),
  })
  .required();

interface SuspendPropertyModalProps {
  show: boolean;
  close: () => void;
  submit: (data: SuspendData) => void;
}

const SuspendPropertyModal: React.FC<SuspendPropertyModalProps> = ({
  show,
  close,
  submit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SuspendData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<SuspendData> = (data) => {
    reset();
    submit(data);
  };

  return (
    <Modal show={show} close={close}>
      <div className={styles.header}>
        <h1 className={styles.header__ttl}>Suspend Property</h1>

        <CloseIcon
          className={styles.header__close}
          role="button"
          onClick={close}
        />
      </div>

      <form>
        <Input
          label={`Why are you suspending this property?`}
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
          Suspend
        </Button>
      </form>
    </Modal>
  );
};

export { SuspendPropertyModal };
