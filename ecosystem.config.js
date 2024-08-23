module.exports = {
  apps : [{
    name   : "backend",
    script : "./index.js",
	cwd: "./server/",
	env: {
		NODE_ENV: "production",
		PORT: 5001
	}
  }, {
    name   : "frontend",
    script : ".output/server/index.mjs",
	cwd: "./client/",
	env: {
		NODE_ENV: "production",
		PORT: 3001
	}
  }]
}
