import {
	UpdateName,
	UpdatePassword,
	updateNameService,
	updatePasswordService,
	userNameService,
} from "api";
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
		requestStatus: updateNameRequestStatus,
	} = useApiRequest({});
	const {
		run: runUpdatePassword,
		data: passwordInfo,
		requestStatus: updatePasswordResponseStatus,
	} = useApiRequest({});

	useMemo(() => {
		if (userInfo?.status === 200) {
			const userInfoFirstName = userInfo.data.firstname;
			const userInfoLastName = userInfo.data.lastname;
			setUserName({ firstname: userInfoFirstName, lastname: userInfoLastName });
		} else {
		}
	}, [userInfo]);

	useMemo(() => {
		if (nameInfo?.status === 200) {
			alert("Name Changed Successfully");
		} else if (nameInfo?.status === 404) {
			console.log("Error");
		}
	}, [nameInfo]);
	useMemo(() => {
		if (passwordInfo?.status === 200) {
			alert("Password Changed Successfully");
		} else if (passwordInfo?.status === 404) {
			console.log("Error");
		} 
	}, [passwordInfo]);

	useEffect(() => {
		runUserName(userNameService());
	}, []);

	const submitNewPassword = (data: UpdatePassword) => {
		runUpdatePassword(updatePasswordService(data));
	};
	const updateUserName = (data: UpdateName) => {
		runUpdateName(updateNameService(data));
	};

	useEffect(() => {
		setLoading(
			userNameRequestStatus.isPending ||
				updatePasswordResponseStatus.isPending ||
				updateNameRequestStatus.isPending
		);
	}, [
		userNameRequestStatus,
		updateNameRequestStatus,
		updatePasswordResponseStatus,
	]);

	return (
		<>
			<Preloader loading={loading} />
			<SettingsUI
				account={userName}
				submitPassword={submitNewPassword}
				reset={false}
				updateName={updateUserName}
			/>
		</>
	);
};

export { Settings };
