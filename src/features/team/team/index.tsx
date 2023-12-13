import { yupResolver } from "@hookform/resolvers/yup";
import { AddIcon, CloseIcon, EmptyStreet } from "assets";
import {
  CustomSelect,
  Button,
  Input,
  initOptionType,
  optionTypeSchema,
  Pagination,
  TableHeaderItemProps,
  TeamTableItem,
  TeamTable,
  EmptyTable,
  Table,
  Search,
  TeamFilter,
} from "components";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { optionType } from "types";
import styles from "./styles.module.scss";
import * as yup from "yup";
import { inviteMemberRequestData } from "api/services/team";
import { useEffect } from "react";

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Name" },
  { title: "Email" },
  { title: "Date Added" },
  { title: "Role" },
  { title: "" },
];

const member: TeamTableItem = {
  id: "123",
  name: "John Doe",
  email: "johndoe@yopmail.com",
  role: "Administrator",
  dateAdded: "12/08/2023",
};

const members = new Array(10).fill(member);

export const roleOptions: optionType[] = [
  {
    label: "Administrator",
    value: "administrator",
  },
  {
    label: "Member",
    value: "member",
  },
];

interface Invite {
  email: string;
  role: optionType;
}

interface InviteForm {
  invites: Invite[];
}

const inviteSchema = yup
  .object({
    invites: yup
      .array()
      .of(
        yup.object({
          email: yup.string().required("Required").email("Enter a valid email"),
          role: optionTypeSchema(),
        })
      )
      .required(),
  })
  .required();

interface TeamUIProps {
  handleInvite: (data: inviteMemberRequestData[]) => void;
  clear: boolean;
  members: TeamTableItem[];
  search: {
    value: string;
    handleChange: (search: string) => void;
  };
  role: {
    value: string | undefined;
    handleChange: (val) => void;
  };
  pagination: {
    handleChange: (page: number) => void;
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageLimit: number;
  };
  handleDelete: ({ id, email }) => void;
}
const TeamUI: React.FC<TeamUIProps> = ({
  handleInvite,
  clear,
  members,
  pagination,
  search,
  role,
  handleDelete,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    reset,
  } = useForm<InviteForm>({
    resolver: yupResolver(inviteSchema),
    defaultValues: { invites: [{ email: "", role: initOptionType }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "invites",
  });

  useEffect(() => {
    reset({ invites: [{ email: "", role: initOptionType }] });
  }, [clear]);

  const onAppend: SubmitHandler<InviteForm> = () => {
    append({ email: "", role: initOptionType });
  };

  const onSubmit: SubmitHandler<InviteForm> = (data) => {
    handleInvite(
      data.invites.map((item) => ({ email: item.email, role: item.role.value }))
    );
  };
  return (
    <>
      <section className={styles.heading}>
        <h1 className={styles.heading__ttl}>Team Management</h1>
        <p>Manage your team members and their accounts here.</p>
      </section>
      <section className={`${styles.infoSec} ${styles.border}`}>
        <div className={styles.descrip}>
          <p className={styles.descrip__ttl}>Add Team Members</p>
          <p className={styles.descrip__txt}>
            Expand your team, add new team members
          </p>
        </div>
        <div className={styles.formWrap}>
          <form className={styles.form}>
            {fields.map((field, index) => (
              <fieldset key={field.id}>
                <Input
                  label=""
                  placeholder="Enter email"
                  type="email"
                  className={styles.inputName}
                  required
                  validatorMessage={
                    errors.invites ? errors.invites[index]?.email?.message : ""
                  }
                  name={`invites.${index}.email`}
                  register={register}
                  parentClassName={`${styles.inputWrap}`}
                  value={watch(`invites.${index}.email`)}
                />
                <CustomSelect
                  onChange={(val) => setValue(`invites.${index}.role`, val)}
                  validatorMessage={
                    errors.invites
                      ? errors.invites[
                          index
                        ]?.role?.value?.message?.toString() ?? ""
                      : ""
                  }
                  name={`invites.${index}.role`}
                  placeholder={"Select role"}
                  label={""}
                  options={roleOptions}
                  value={watch(`invites.${index}.role`)}
                  parentClassName={`${styles.inputWrap} ${styles.halfInput}`}
                  inputClass={styles.input}
                />
                <CloseIcon
                  role="button"
                  className={styles.remove}
                  onClick={() => {
                    if (fields.length === 1) reset();
                    else remove(index);
                  }}
                />
              </fieldset>
            ))}
            <div>
              <Button
                className={styles.addBtn}
                onClick={handleSubmit(onAppend)}
                type="tertiary"
              >
                <AddIcon />
                Add another
              </Button>
              <Button
                className={styles.sendBtn}
                onClick={handleSubmit(onSubmit)}
                type="primary"
              >
                Send invites
              </Button>
            </div>
          </form>
        </div>
      </section>
      <div className={styles.tableHeading}>
        <div>
          <h1 className={styles.tableHeading__ttl}>Team Members</h1>
          <span className={styles.tableHeading__tag}>
            {pagination.totalCount} member(s)
          </span>
        </div>
        <p>Manage your team members</p>
      </div>
      <section className={styles.searchFilter}>
        <TeamFilter
          submit={role.handleChange}
          role={
            role.value ? { label: role.value, value: role.value } : undefined
          }
        />
        <Search
          className={styles.search}
          value={search.value}
          placeholder={"Search by name or email"}
          handleChange={search.handleChange}
        />
      </section>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <TeamTable
            tableBodyItems={members}
            handleDelete={handleDelete}
            tableBodyRowClassName={styles.tableBodyItem}
          />
        }
        customTableClasses={{
          tableContainerClassName: styles.tableWrap,
          tableHeaderClassName: styles.tableHeader,
          tableHeaderItemClassName: styles.tableHeaderItem,
        }}
        emptyTable={{
          show: false,
          element: (
            <EmptyTable
              Vector={EmptyStreet}
              heading={"No team member found"}
              text={"There are no team members at this time"}
            />
          ),
        }}
      />
      <Pagination {...pagination} name={"Team Members"} />
    </>
  );
};

export { TeamUI };
