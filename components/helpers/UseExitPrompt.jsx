import { useState, useEffect } from "react";

const initBeforeUnLoad = (showExitPrompt) => {
	window.onbeforeunload = (event) => {
		if (showExitPrompt) {
			const e = event || window.event;
			e.preventDefault();
			if (e) {
				e.returnValue = "";
			}
			return "";
		}
	};
};

/**
 * https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
 */
export default function UseExitPrompt(bool) {
	const [showExitPrompt, setShowExitPrompt] = useState(bool);

	window.onload = function () {
		initBeforeUnLoad(showExitPrompt);
	};

	useEffect(() => {
		initBeforeUnLoad(showExitPrompt);
	}, [showExitPrompt]);

	return null;
}
