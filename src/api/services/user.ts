import { getRequest } from "api";
import { usersURL } from "api/urls/users";

/**
 * User service
 * @returns axios promise
 */

export const usersService = () => {
    const request = {
        url: usersURL(),
    }
    return getRequest(request)
}
