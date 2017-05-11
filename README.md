# isomorphic-fetch-reverse-proxy
Using Isomorphic Fetch to use `fetch` calls on both server and client. 

In this example I built a reverse proxy (a common development scenario) using `isomorphic-fetch`, a Node compatible `whatwg-fetch` wrapper. It results in less, more straightforward code than using `request` in node. For promises I'm using the `promise-polyfill` package.

Since we're using Node v7.10 we can also take advantage of `async`/`await`. 

## Usage

Run `npm run build` and then `npm start`. Optionally, you can use `npm run watch` to watch the build.

## Todo

- [ ] Use `async`/`await` on the browser.