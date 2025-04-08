export default `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ETOH Proxy API Documentation</title>
    <style>
        {{styles}}
    </style>
</head>
<body>
    <nav class="sidebar">
        <div class="theme-toggle">
            <button onclick="toggleTheme()" id="theme-button">🌙</button>
        </div>
        <div class="nav-content">
            <h3>Navigation</h3>
            <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li>
                    <a href="#endpoints">Endpoints</a>
                    <ul class="endpoint-nav">
                        {{endpoint-nav}}
                    </ul>
                </li>
                <li><a href="#error-handling">Error Handling</a></li>
                <li><a href="#cors">CORS</a></li>
            </ul>
        </div>
    </nav>

    <main class="content">
        <div class="container">
            <h1>ETOH Proxy API Documentation</h1>

            <section id="introduction">
                <p>This API serves as a proxy for retrieving Roblox user and badge data. It handles CORS and provides streamlined access to Roblox's APIs.</p>
            </section>

            <section id="endpoints">
                <h2>Endpoints</h2>
                {{endpoints}}
            </section>

            <section id="error-handling">
                <h2>Error Handling</h2>
                <p>The API returns appropriate HTTP status codes and error messages:</p>
                <ul>
                    <li><code>404</code> - Resource not found</li>
                    <li><code>500</code> - Server error</li>
                    <li><code>400</code> - Bad request</li>
                </ul>
            </section>

            <section id="cors">
                <h2>CORS</h2>
                <p>This API supports Cross-Origin Resource Sharing (CORS) and allows requests from any origin.</p>
            </section>
        </div>
    </main>

    <script>
    		function toggleEndpoint(id) {
            const endpoint = document.getElementById(id);
            const content = endpoint.querySelector('.endpoint-content');
            const button = endpoint.querySelector('.toggle-btn');

            if (content.style.display === 'none') {
                content.style.display = 'block';
                button.textContent = '▼';
            } else {
                content.style.display = 'none';
                button.textContent = '▶';
            }
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            const button = document.getElementById('theme-button');
            button.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        }

        // Apply saved theme preference
        if (localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-theme');
            document.getElementById('theme-button').textContent = '☀️';
        }

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
`;