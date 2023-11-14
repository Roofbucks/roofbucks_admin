import { Button, DocumentInput, Input, Modal } from "components";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon } from "assets";

interface ApproveData {
  contract: File | any;
  paymentEvidence: File | any;
}

const initialValues: ApproveData = {
  contract: null,
  paymentEvidence: null,
};

const schema = yup
  .object({
    contract: yup.mixed().required("Required"),
    paymentEvidence: yup.mixed().required("Required"),
  })
  .required();

interface ApproveListingApplicationProps {
  show: boolean;
  close: () => void;
  submit: (data: ApproveData) => void;
}

const ApproveMarketplaceApplicationModal: React.FC<
  ApproveListingApplicationProps
> = ({ show, close, submit }) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ApproveData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<ApproveData> = (data) => submit(data);

  return (
    <Modal show={show} close={close}>
      <div className={styles.header}>
        <h1 className={styles.header__ttl}>Register Investor</h1>

        <CloseIcon
          className={styles.header__close}
          role="button"
          onClick={close}
        />
      </div>

      <form>
        <DocumentInput
          label="Upload contract"
          id={"contract"}
          file={watch("contract")}
          handleChangeDoc={({ id, e }) =>
            setValue("contract", e.target.files[0])
          }
          handleRemoveDoc={() => setValue("contract", null)}
          error={errors.contract?.message?.toString()}
        />
        <DocumentInput
          label="Upload payment evidence"
          id={"paymentEvidence"}
          file={watch("paymentEvidence")}
          handleChangeDoc={({ id, e }) =>
            setValue("paymentEvidence", e.target.files[0])
          }
          handleRemoveDoc={() => setValue("paymentEvidence", null)}
          error={errors.paymentEvidence?.message?.toString()}
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

export { ApproveMarketplaceApplicationModal };
