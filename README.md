# Readout

## Deploy

On the `main` branch:

[1] Set the version number in  the `start` script in `package.json`

	```
    "start": "VERSION=v0.4.1 EASY=https://easy--prod-welkmofgdq-uc.a.run.app node server/index.js",
	```

[2] Start the server:

```
npm start
````

[3] Generate all the static files:

```
npm run generate && npm run github-pages
```

[4] Push the `main` branch, then check the GitHub Pages URL:

https://readout.brokenbaysoftware.co/