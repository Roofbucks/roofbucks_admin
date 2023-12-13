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

export interface TeamFilterData {
  role: optionType;
}

const initFilterData: TeamFilterData = {
  role: initOptionType,
};

const schema = yup
  .object({
    role: optionTypeSchema(""),
  })
  .required();

interface TeamFilterModalProps {
  show: boolean;
  close: () => void;
  submit: (role: string) => void;
  role: optionType | undefined;
}

const TeamFilterModal: React.FC<TeamFilterModalProps> = ({
  show,
  close,
  submit,
  role,
}) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<TeamFilterData>({
    resolver: yupResolver(schema),
    defaultValues: { role: initOptionType },
  });

  useEffect(() => {
    role && reset({ role });
  }, [role]);

  const roleOptions: optionType[] = [
    {
      label: "Administrator",
      value: "Administrator",
    },
    {
      label: "Member",
      value: "Member",
    },
  ];

  const onSubmit: SubmitHandler<TeamFilterData> = (data) => {
    submit(data.role.value);
    close();
  };
  const disableSubmit = watch("role")?.label === "";

  const handleReset = () => {
    reset(initFilterData);
    submit("");
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
            onChange={(val) => setValue(`role`, val)}
            validatorMessage={
              errors?.role ? errors?.role?.value?.message?.toString() ?? "" : ""
            }
            name={`role`}
            placeholder={"Select role"}
            options={roleOptions}
            value={watch("role")}
            parentClassName={styles.inputWrap}
            inputClass={styles.select}
            label="Role"
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
            Apply filter
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { TeamFilterModal };
