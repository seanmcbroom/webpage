import express from "express";
import path from "path";
import { log } from "./util/log";

const port = 4882;
const app = express();
const router = express.Router();
const vueBuildPath = path.normalize(path.join(__dirname, "dist"));

// Serve API routes
app.use(router);

// Set headers
app.use((req, res, next) => {
	// Add cache headers (for images, fonts, etc.)
	res.setHeader("Cache-Control", `public, max-age=${60 * 60 * 24 * 7 * 1000}`); // 1 week

	// Add CSP headers
	res.setHeader(
		"Content-Security-Policy",
		"default-src 'self' 'unsafe-inline' kirakirafoxx.com; img-src 'self' https: data:; font-src 'self' data: fonts.googleapis.com fonts.gstatic.com;",
	);

	next();
});

// Serve static files from dist
app.use(express.static(vueBuildPath));

// Serve app for all other requests
app.use(async (req, res, next) => {
	// Send the index.html file
	res.sendFile(path.join(vueBuildPath, "index.html"));
});

app.listen(port, () => log(`[Express] Listening on port ${port} [http://localhost:${port}]`, { textColor: "blue" }));
