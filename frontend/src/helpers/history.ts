import { createBrowserHistory, Location, History } from 'history';
import qs from 'qs';

interface MLocation extends Location {
	query: {
		[query: string]: string|any;
	};
	state: {
		[state: string]: string;
	};
}
interface HistoryProps extends History {
	location: MLocation;
}

const history = createBrowserHistory() as HistoryProps;

history.location = {
	...history.location,
	query: qs.parse(history.location.search.substr(1)),
	state: {},
};
history.listen(() => {
	history.location = {
		...history.location,
		query: qs.parse(history.location.search.substr(1)),
		state: history.location.state || {},
	};
});

const getRedirectPath = (router = window) => encodeURIComponent(`${router.location.pathname}${router.location.search}`);
const { go, push, replace } = history;

export { go, push, replace, getRedirectPath };
export default history;