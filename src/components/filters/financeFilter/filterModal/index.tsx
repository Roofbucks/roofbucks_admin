import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";
import { optionType } from "types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, CustomSelect, Input, initOptionType } from "components";
import { useEffect } from "react";

interface optionType2 {
  label?: any;
  value?: any;
}

export interface FinanceFilterData {
  type: optionType2;
  status: optionType2;
  startDate: string | undefined;
  endDate: string | undefined;
}

const initFilterData: FinanceFilterData = {
  type: initOptionType,
  status: initOptionType,
  startDate: "",
  endDate: "",
};

const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string(),
});

const schema = yup
  .object({
    type: optionTypeSchema,
    status: optionTypeSchema,
    startDate: yup.string(),
    endDate: yup.string(),
  })
  .required();

interface FinanceFilterModalProps {
  show: boolean;
  close: () => void;
  submit: ({ status, startDate, endDate, type }) => void;
  value: FinanceFilterData;
}

const FinanceFilterModal: React.FC<FinanceFilterModalProps> = ({
  show,
  close,
  submit,
  value,
}) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    register,
  } = useForm<FinanceFilterData>({
    resolver: yupResolver(schema),
    defaultValues: initFilterData,
  });

  useEffect(() => {
    reset(value);
  }, [value]);

  const typeOptions: optionType[] = [
    {
      label: "Rent",
      value: "RENT",
    },
    {
      label: "Deposit",
      value: "DEPOSIT",
    },
    {
      label: "Investment",
      value: "INVESTMENT",
    },
    {
      label: "Buy back",
      value: "BUY-BACK",
    },
    {
      label: "Deposit payout",
      value: "DEPOSIT-PAYOUT",
    },
    {
      label: "Rent payout",
      value: "RENT-PAYOUT",
    },
    {
      label: "Buy back payout",
      value: "BUY-BACK-PAYOUT",
    },
  ];

  const statusOptions: optionType[] = [
    {
      label: "Pending",
      value: "PENDING",
    },
    {
      label: "Success",
      value: "SUCCESS",
    },
    {
      label: "Failed",
      value: "FAILED",
    },
  ];

  const onSubmit: SubmitHandler<FinanceFilterData> = (data) => {
    submit(data);
    close();
  };
  const disableSubmit =
    watch("type")?.label === "" &&
    watch("status")?.label === "" &&
    watch("endDate") === "" &&
    watch("startDate") === "";

  const handleReset = () => {
    reset(initFilterData);
    submit(initFilterData);
    close();
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
            value={{
              label: watch("type.label") ?? "",
              value: watch("type.value") ?? "",
            }}
            parentClassName={styles.inputWrap}
            inputClass={styles.select}
            label="Transaction Type"
          />
          <CustomSelect
            onChange={(val) => setValue(`status`, val)}
            validatorMessage={
              errors?.status
                ? errors?.status?.value?.message?.toString() ?? ""
                : ""
            }
            name={`status`}
            placeholder={"Select status"}
            options={statusOptions}
            value={{
              label: watch("status.label") ?? "",
              value: watch("status.value") ?? "",
            }}
            parentClassName={styles.inputWrap}
            inputClass={styles.select}
            label="Status"
          />
          <Input
            label="Start Date"
            placeholder={"Enter a start date"}
            name={"startDate"}
            validatorMessage={errors?.startDate?.message}
            register={register}
            type="date"
          />
          <Input
            label="End Date"
            placeholder={"Enter an end date"}
            name={"endDate"}
            validatorMessage={errors?.endDate?.message}
            register={register}
            type="date"
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
