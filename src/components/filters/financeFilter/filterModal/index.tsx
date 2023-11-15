import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";
import { optionType } from "types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  CustomSelect,
  initOptionType,
  optionTypeSchema,
} from "components";
import { useEffect } from "react";

export interface FinanceFilterData {
  type: optionType;
}

const initFilterData: FinanceFilterData = {
  type: initOptionType,
};

const schema = yup
  .object({
    type: optionTypeSchema(""),
  })
  .required();

interface FinanceFilterModalProps {
  show: boolean;
  close: () => void;
  submit: (type) => void;
  type: optionType;
}

const FinanceFilterModal: React.FC<FinanceFilterModalProps> = ({
  show,
  close,
  submit,
  type,
}) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FinanceFilterData>({
    resolver: yupResolver(schema),
    defaultValues: { type },
  });

  useEffect(() => {
    reset({ type });
  }, [type]);

  const typeOptions: optionType[] = [
    {
      label: "Rent",
      value: "Rent",
    },
    {
      label: "Deposit",
      value: "Deposit",
    },
    {
      label: "Investment",
      value: "Investment",
    },
    {
      label: "Buy back",
      value: "Buy back",
    },
  ];

  const onSubmit: SubmitHandler<FinanceFilterData> = (data) => {
    submit(data.type);
    close();
  };
  const disableSubmit = watch("type")?.label === "";

  const handleReset = () => {
    reset(initFilterData);
    submit(initOptionType);
  };

  return (
    <>
      <Modal
        contentClassName={styles.modal}
        position={"centered"}
        close={close}
        show={show}
      >
        <div className={styles.header}>
          <p>Filter Options</p>
          <CloseIcon role="button" onClick={close} />
        </div>
        <form className={styles.form}>
          <CustomSelect
            onChange={(val) => setValue(`type`, val)}
            validatorMessage={
              errors?.type ? errors?.type?.value?.message?.toString() ?? "" : ""
            }
            name={`type`}
            placeholder={"Select transaction type"}
            options={typeOptions}
            value={watch("type")}
            parentClassName={styles.inputWrap}
            inputClass={styles.select}
            label="Transaction Type"
          />
        </form>
        <div className={styles.footer}>
          <Button type="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button
            disabled={disableSubmit}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Apply filters
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { FinanceFilterModal };
