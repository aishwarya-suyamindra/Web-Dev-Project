import { sessionService } from 'redux-react-session';
import { cache } from "./cache.js"

export const login = (user) => {
    sessionService.saveSession({ user });
    cache.setItem("User", user)
}

export const logout = () => {
    sessionService.deleteSession();
    cache.clear()
}