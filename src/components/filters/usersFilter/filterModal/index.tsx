import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";
import { optionType } from "types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, CustomSelect, initOptionType } from "components";
import { useEffect } from "react";

interface optionType2 {
  label?: any;
  value?: any;
}

export interface UsersFilterData {
  status: optionType2;
  accountType: optionType2;
}

const initFilterData: UsersFilterData = {
  status: { label: "", value: "" },
  accountType: { label: "", value: "" },
};

const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string(),
});

const schema = yup
  .object({
    status: optionTypeSchema,
    accountType: optionTypeSchema,
  })
  .required();

interface UsersFilterModalProps {
  show: boolean;
  close: () => void;
  submit: ({ status, accountType }) => void;
  status: optionType | undefined;
  accountType: optionType | undefined;
}

const UsersFilterModal: React.FC<UsersFilterModalProps> = ({
  show,
  close,
  submit,
  status,
  accountType,
}) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<UsersFilterData>({
    resolver: yupResolver(schema),
    defaultValues: initFilterData,
  });

  useEffect(() => {
    let data = { ...initFilterData };
    if (status) data.status = status;
    if (accountType) data.accountType = accountType;
    reset(data);
  }, [status, accountType]);

  const statusOptions: optionType[] = [
    {
      label: "Verified",
      value: "verified",
    },
    {
      label: "Unverified",
      value: "unverified",
    },
    {
      label: "Suspended",
      value: "suspended",
    },
  ];
  const accountOptions: optionType[] = [
    {
      label: "Agent",
      value: "AGENT",
    },
    {
      label: "Shareholder",
      value: "SHAREHOLDER",
    },
  ];

  const onSubmit: SubmitHandler<UsersFilterData> = (data) => {
    submit(data);
    close();
  };
  const disableSubmit =
    watch("status")?.label === "" && watch("accountType")?.value === "";

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
              label: watch("status").label ?? "",
              value: watch("status").value ?? "",
            }}
            parentClassName={styles.inputWrap}
            inputClass={styles.select}
            label="Status"
          />
          <CustomSelect
            onChange={(val) => setValue(`accountType`, val)}
            validatorMessage={
              errors?.accountType
                ? errors?.accountType?.value?.message?.toString() ?? ""
                : ""
            }
            name={`accountType`}
            placeholder={"Select account type"}
            options={accountOptions}
            value={{
              label: watch("accountType").label ?? "",
              value: watch("accountType").value ?? "",
            }}
            parentClassName={styles.inputWrap}
            inputClass={styles.select}
            label="Account type"
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

export { UsersFilterModal };
