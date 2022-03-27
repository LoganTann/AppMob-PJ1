import Auth from "./Auth/Auth";
import HostGame from "./Game/HostGame";
import JoinGame from "./Game/JoinGame";
import PlayGame from "./Game/PlayGame";
import ProfilePage from "./Home/ProfilePage";
import MainPage from "./Welcome/MainPage";

/**
 * Définition des vues par leur nom uniques.
 */
export const routes = {
	auth: {
		auth: {
			name: "auth/auth",
			component: Auth,
		},
	},
	game: {
		host: {
			name: "game/host",
			component: HostGame,
		},
		join: {
			name: "game/join",
			component: JoinGame,
		},
		play: {
			name: "game/play",
			component: PlayGame,
		},
	},
	home: {
		profile: {
			name: "home/profile",
			component: ProfilePage,
		},
	},
	welcome: {
		main: {
			name: "welcome/main",
			component: MainPage,
		},
	},
};
