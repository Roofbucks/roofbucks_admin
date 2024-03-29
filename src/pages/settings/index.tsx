import { userNameService } from "api";
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
			setUserName({ firstname: userInfoFirstName, lastname: userInfoLastName });
		} else {
			console.log(userInfo?.status);
		}
	}, []);

	useEffect(() => {
		run(userNameService());
	}, []);

	useEffect(() => {
		setLoading(requestStatus.isPending);
	}, [requestStatus]);
	return (
		<>
			<Preloader loading={loading} />
			<SettingsUI
				account={userName}
				submitPassword={console.log}
				reset={false}
			/>
		</>
	);
};

export { Settings };
