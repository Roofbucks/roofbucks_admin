import { UpdatePassword, updatePasswordService, userNameService } from "api";
import { AccountData, SettingsUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { Preloader } from "components";

const Settings = () => {
	const [userName, setUserName] = useState<AccountData>({
		firstname: "",
		lastname: "",
	});
	const [loading, setLoading] = useState(false);

	const {
		run: runUserName,
		data: userInfo,
		requestStatus: userNameRequestStatus,
	} = useApiRequest({});
	const {
		run: runUpdateName,
		data: nameInfo,
		requestStatus: updateNameInfo,
	} = useApiRequest({});
	const {
		run: runUpdatePassword,
		data: passwordInfo,
		requestStatus: updatePasswordResponseStatus,
	} = useApiRequest({});

	useMemo(() => {
		console.log(userInfo);
		if (userInfo?.status === 200) {
			const userInfoFirstName = userInfo.data.firstname;
			const userInfoLastName = userInfo.data.lastname;
			setUserName({ firstname: userInfoFirstName, lastname: userInfoLastName });
		} else {
		}
	}, []);
	useMemo(() => {
		if (passwordInfo?.status === 200) {
			console.group("success");
		} else {
		}
	}, []);

	useEffect(() => {
		runUserName(userNameService());
	}, []);

	const submitNewPassword = (data: UpdatePassword) => {
		runUpdatePassword(updatePasswordService(data));
	};

	useEffect(() => {
		setLoading(userNameRequestStatus.isPending);
	}, [userNameRequestStatus]);

	return (
		<>
			<Preloader loading={loading} />
			<SettingsUI
				account={userName}
				submitPassword={submitNewPassword}
				reset={false}
			/>
		</>
	);
};

export { Settings };
