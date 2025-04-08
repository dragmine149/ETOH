export default `/* CSS Variables for theming */
:root {
	--bg-primary: #ffffff;
	--bg-secondary: #f5f7fa;
	--text-primary: #333333;
	--text-secondary: #476582;
	--accent-color: #3498db;
	--border-color: #eef2f7;
	--code-bg: #f8fafc;
	--endpoint-bg: #f8fafc;
	--shadow-color: rgba(0, 0, 0, 0.1);
}

.dark-theme {
	--bg-primary: #1a1a1a;
	--bg-secondary: #2d2d2d;
	--text-primary: #ffffff;
	--text-secondary: #b3b3b3;
	--accent-color: #61dafb;
	--border-color: #404040;
	--code-bg: #2d2d2d;
	--endpoint-bg: #2d2d2d;
	--shadow-color: rgba(0, 0, 0, 0.3);
}

/* Base styles */
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	line-height: 1.6;
	margin: 0;
	padding: 0;
	color: var(--text-primary);
	background-color: var(--bg-secondary);
	min-height: 100vh;
}

/* Layout */
.sidebar {
	position: fixed;
	width: 250px;
	height: 100vh;
	background: var(--bg-primary);
	border-right: 1px solid var(--border-color);
	padding: 20px;
	box-sizing: border-box;
}

.content {
	margin-left: 250px;
	padding: 20px;
	min-height: 100vh;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
	background-color: var(--bg-primary);
	box-shadow: 0 2px 4px var(--shadow-color);
	border-radius: 8px;
}

/* Navigation */
.nav-content {
	margin-top: 60px;
}

.nav-content ul {
	list-style: none;
	padding: 0;
}

.nav-content a {
	color: var(--text-primary);
	text-decoration: none;
	padding: 8px 0;
	display: block;
	transition: color 0.3s;
}

.nav-content a:hover {
	color: var(--accent-color);
}

/* Theme Toggle */
.theme-toggle {
	position: fixed;
	top: 20px;
	left: 20px;
}

.theme-toggle button {
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	padding: 8px;
	border-radius: 50%;
	transition: background-color 0.3s;
}

.theme-toggle button:hover {
	background-color: var(--bg-secondary);
}

/* Typography */
h1 {
	color: var(--text-primary);
	margin-top: 0;
	padding-bottom: 20px;
	border-bottom: 2px solid var(--border-color);
	font-size: 2.5em;
}

h2 {
	color: var(--text-primary);
	margin-top: 2em;
	padding-bottom: 10px;
	border-bottom: 2px solid var(--border-color);
	font-size: 1.8em;
}

/* Code elements */
code {
	background: var(--code-bg);
	border-radius: 4px;
	padding: 2px 6px;
	font-family: 'Monaco', 'Consolas', monospace;
	font-size: 0.9em;
	color: var(--accent-color);
	border: 1px solid var(--border-color);
}

/* Endpoint sections */
.endpoint {
	background: var(--endpoint-bg);
	border: 1px solid var(--border-color);
	margin: 20px 0;
	border-radius: 8px;
	overflow: hidden;
}

.endpoint-header {
	padding: 15px;
	background: var(--bg-secondary);
	display: flex;
	align-items: center;
	gap: 10px;
	border-bottom: 1px solid var(--border-color);
}

.endpoint-content {
	padding: 20px;
}

.method {
	padding: 5px 10px;
	border-radius: 4px;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 0.9em;
}

.method.get {
	background: #61affe;
	color: white;
}

.method.post {
	background: #49cc90;
	color: white;
}

.method.put {
	background: #fca130;
	color: white;
}

.method.delete {
	background: #f93e3e;
	color: white;
}

.path {
	flex: 1;
	margin: 0;
}

.toggle-btn {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.2em;
	color: var(--text-secondary);
	padding: 0 10px;
}

.parameters,
.responses {
	margin-top: 20px;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin: 10px 0;
}

th,
td {
	padding: 10px;
	text-align: left;
	border: 1px solid var(--border-color);
}

th {
	background: var(--bg-secondary);
	font-weight: 600;
}

.response {
	margin: 10px 0;
	border: 1px solid var(--border-color);
	border-radius: 4px;
}

.response-header {
	padding: 10px;
	background: var(--bg-secondary);
	display: flex;
	gap: 10px;
	align-items: center;
}

.status-code {
	font-weight: bold;
}

.response-model {
	padding: 10px;
}

.description {
	margin: 10px 0 20px 0;
	color: var(--text-secondary);
}

/* Lists */
ul {
	padding-left: 20px;
}

ul li {
	margin: 8px 0;
	color: var(--text-secondary);
}

/* Sections */
section {
	margin: 40px 0;
}

#introduction {
	font-size: 1.1em;
	color: var(--text-secondary);
	margin-bottom: 40px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.sidebar {
		width: 100%;
		height: auto;
		position: relative;
		padding: 10px;
	}

	.content {
		margin-left: 0;
		padding: 10px;
	}

	.container {
		margin: 0;
		padding: 15px;
		border-radius: 0;
	}

	h1 {
		font-size: 2em;
	}

	.endpoint {
		padding: 15px;
	}

	.nav-content {
		margin-top: 20px;
	}

	.theme-toggle {
		position: absolute;
	}
}

/* Endpoint navigation */
.endpoint-nav {
	padding-left: 15px !important;
	margin-top: 5px !important;
	font-size: 0.9em;
}

.endpoint-nav li {
	margin: 4px 0 !important;
}

.endpoint-nav a {
	color: var(--text-secondary) !important;
	padding: 4px 0 !important;
}

.endpoint-nav a:hover {
	color: var(--accent-color) !important;
}
`;