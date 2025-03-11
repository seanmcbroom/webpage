const logSettings = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",

	// Foreground (text) colors
	text: {
		black: "\x1b[38;2;0;0;0m",
		green: "\x1b[38;2;80;240;80m",
		blue: "\x1b[38;2;80;160;240m",
		red: "\x1b[38;2;240;80;80m",
		orange: "\x1b[38;2;255;145;36m",
		purple: "\x1b[38;2;160;80;240m",
	},

	// Background colors
	background: {
		black: "\x1b[48;2;0;0;0m",
		green: "\x1b[48;2;80;240;80m",
		blue: "\x1b[48;2;80;160;240m",
		red: "\x1b[48;2;240;80;80m",
		orange: "\x1b[48;2;255;145;36m",
		purple: "\x1b[48;2;160;80;240m",
	},
};

interface LogInfo {
	backgroundColor?: keyof (typeof logSettings)["background"];
	textColor?: keyof (typeof logSettings)["text"];
}

export const log = (text: string, info: LogInfo) => {
	let color = "";

	if (info.backgroundColor) color += logSettings.background[info.backgroundColor];
	if (info.textColor) color += logSettings.text[info.textColor];

	console.log(`${color}%s${logSettings.reset}`, text);
};
