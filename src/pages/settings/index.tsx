import { updatePasswordService, userNameService } from "api";
import { SettingsUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { Preloader } from "components";

const Settings = () => {
	const [userName, setUserName] = useState({
		firstname: "",
		lastname: "",
	});
	const [loading, setLoading] = useState(false);
	const { run, data: userInfo, requestStatus } = useApiRequest({});

	useMemo(() => {
		if (userInfo?.status === 200) {
			const userInfoFirstName = userInfo.data.firstname;
			const userInfoLastName = userInfo.data.lastname;
			console.log(userInfo);
			setUserName({ firstname: userInfoFirstName, lastname: userInfoLastName });
		} else {
			console.log("Failed to get User names");
		}
	}, []);
	useEffect(() => {
		run(userNameService());
	}, []);

	useEffect(() => {
		setLoading(requestStatus.isPending);
	}, [requestStatus]);
	const {
		run: updatePassword,
		data: passwordInfo,
		requestStatus: responseStatus,
	} = useApiRequest({});

	const [newPassword, setNewPassword] = useState({
		current_password: "",
		new_password: "",
	});
	useMemo(() => {
		if (passwordInfo?.status === 200) {
			// setNewPassword();
			console.group("success");
		} else {
			console.log("Failed to get User names");
		}
	}, []);

	useEffect(() => {}, []);
	const submitNewPassword = ({ newPassword }) => {
		run(updatePasswordService(newPassword));
	};
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
