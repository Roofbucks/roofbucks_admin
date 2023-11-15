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
    label: "Admin",
    value: "admin",
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

const invite: PendingInviteData = {
  email: "bensonboone@yopmail.com",
  role: "Administrator",
  date: "11/11/2023 5:07 PM GMT",
  id: "123",
};

const invites: PendingInviteData[] = new Array(6).fill(invite);

interface TeamUIProps {
  handleInvite: (data: Invite[]) => void;
  handleResendInvite: (id) => void;
  handleRevokeInvite: (id) => void;
}
const TeamUI: React.FC<TeamUIProps> = ({
  handleInvite,
  handleResendInvite,
  handleRevokeInvite,
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

  const onAppend: SubmitHandler<InviteForm> = () => {
    append({ email: "", role: initOptionType });
  };

  const onSubmit: SubmitHandler<InviteForm> = (data) => {
    handleInvite(data.invites);
    reset({ invites: [{ email: "", role: initOptionType }] });
  };
  return (
    <>
      <section className={styles.heading}>
        <h1 className={styles.heading__ttl}>Team Management</h1>
        <p>Manage your team members and their accounts here.</p>
      </section>
      <section className={`${styles.infoSec} ${styles.border}`}>
        <div className={styles.descrip}>
          <p className={styles.descrip__ttl}>Invite Team Members</p>
          <p className={styles.descrip__txt}>Invite new team members</p>
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
          <span className={styles.tableHeading__tag}>{15} member(s)</span>
        </div>
        <p>Manage your team members</p>
      </div>
      <section className={styles.searchFilter}>
        <TeamFilter submit={console.log} role={{ label: "", value: "" }} />
        <Search
          className={styles.search}
          value={""}
          placeholder={"Search by name or email"}
          handleChange={console.log}
        />
      </section>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <TeamTable
            tableBodyItems={members}
            handleDelete={console.log}
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
      <Pagination
        currentPage={1}
        totalPages={3}
        handleChange={console.log}
        totalCount={21}
        pageLimit={10}
        name={"Team Members"}
      />

      <section className={styles.pendingInvites}>
        <div className={styles.pendingInvites__hd}>
          <h4>Pending Invites</h4>
          <p>
            Manage all the sent invites that has not been accepted by users.
          </p>
        </div>
        {invites.length === 0 ? (
          <div className={styles.empty}>
            <EmptyStreet />
            <p>You have no pending invites</p>
          </div>
        ) : (
          <div className={styles.pendingInvites__list}>
            {invites.map((invite, idx) => (
              <PendingInvite
                key={`pending_${idx}`}
                handleResend={handleResendInvite}
                handleRevoke={handleRevokeInvite}
                invite={invite}
              />
            ))}
            <Pagination
              currentPage={1}
              totalPages={3}
              handleChange={console.log}
              totalCount={21}
              pageLimit={6}
              name={"Pending Invites"}
            />
          </div>
        )}
      </section>
    </>
  );
};

export interface PendingInviteData {
  email: string;
  role: string;
  date: string;
  id: string;
}

interface PendingInviteProps {
  handleResend: (id) => void;
  handleRevoke: (id) => void;
  invite: PendingInviteData;
}

const PendingInvite: React.FC<PendingInviteProps> = ({
  handleResend,
  handleRevoke,
  invite,
}) => {
  const { email, role, id, date } = invite;

  return (
    <div className={styles.invite}>
      <div className={styles.invite__avatar}>{email.charAt(0)}</div>
      <div>
        <a href={`mailto:${email}`} className={styles.invite__name}>
          {email} <span>{role}</span>
        </a>
        <p className={styles.invite__mail}>{date}</p>
      </div>
      <Button
        className={styles.resend}
        type={"tertiary"}
        onClick={() => handleResend(id)}
      >
        Resend Invite
      </Button>
      <Button
        className={styles.revoke}
        type={"secondary"}
        onClick={() => handleRevoke(id)}
      >
        Revoke Invite
      </Button>
    </div>
  );
};

export { TeamUI };
