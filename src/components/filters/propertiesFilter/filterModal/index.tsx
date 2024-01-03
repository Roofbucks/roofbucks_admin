import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";
import { optionType } from "types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  SubmitHandler,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Button, CustomSelect, Input } from "components";
import { useEffect } from "react";

interface optionType2 {
  label?: any;
  value?: any;
}

export interface PropertiesFilterData {
  status: optionType2;
  startDate: string | undefined;
  endDate: string | undefined;
}

const initFilterData: PropertiesFilterData = {
  status: { label: "", value: "" },
  startDate: "",
  endDate: "",
};

const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string(),
});

const schema = yup
  .object()
  .shape({
    status: optionTypeSchema,
    startDate: yup.string(),
    endDate: yup.string(),
  })
  .required();

interface PropertiesFilterModalProps {
  show: boolean;
  close: () => void;
  submit: ({ status, startDate, endDate }) => void;
  value: PropertiesFilterData;
}

const PropertiesFilterModal: React.FC<PropertiesFilterModalProps> = ({
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
  } = useForm<PropertiesFilterData>({
    resolver: yupResolver(schema),
    defaultValues: value,
  });

  useEffect(() => {
    reset(value);
  }, [value]);

  const statusOptions: optionType[] = [
    {
      label: "Approved",
      value: "APPROVED",
    },
    {
      label: "Pending",
      value: "PENDING",
    },
    {
      label: "Rejected",
      value: "REJECTED",
    },
  ];

  const onSubmit: SubmitHandler<PropertiesFilterData> = (data) => {
    submit(data);
    close();
  };
  const disableSubmit =
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

export { PropertiesFilterModal };
