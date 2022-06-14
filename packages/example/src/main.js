const { text, html, componentElement } = require("@frostleaf/core");

html("p", new Map(), [text("Hello, world!")]).Render().then(console.log);
