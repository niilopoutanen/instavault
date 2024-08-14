<p align="center">
  <img src="/static/favicon.svg" width=150 height=150/>
</p>
<h1 align="center">InstaVault</h1>
<p align="center">Tool for tracking Instagram followers and archiving data</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" alt="NodeJS"/>
  <img src="https://img.shields.io/badge/SvelteKit-%23f1413d.svg?logo=svelte&logoColor=white" alt="SvelteKit"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff" alt="Vite"/>
  <img src="https://img.shields.io/badge/Svelte-%23f1413d.svg?logo=svelte&logoColor=white" alt="Svelte"/>
  <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white" alt="Instagram"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="TypeScript"/>

</p>

![dashboard](https://github.com/user-attachments/assets/3b6d27ca-75eb-4acf-b1a1-ef0865734a96)

<br>

## Requirements
<ul>
  <li><a href="https://www.npmjs.com/">npm</a></li>
  <li><a href="https://nodejs.org/en">node.js</a></li>
  <li><a href="https://instagram.com">Instagram account</a></li>
</ul>

## Get started

```
1. npm install
2. npm run vault
```
## How does it work?
<ul>
  <li>The app uses a script injected into browser console. No login details are needed.</li>
  <li>The script uses encrypted hash keys, which means that if Instagram changes those at any moment, you can no longer fetch new data.</li>
  <li>Instagram warns about not pasting scripts in the console, but if you have suspicions, see the code for yourself: <a href="https://github.com/niilopoutanen/instavault/blob/main/static/script.js">The console script</a>
</ul>

## Things to note
<ul>
  <li>The data from Instagram's API is not always up to date. In some cases you might have a few days of delay until account changes show up.</li>
  <li>Large accounts are not supported. The script loads accounts in batches of 50 users at a time, so accounts with more than 10 000 followers will take time, and take up lots of RAM. The rate limit is in place to not get blocked by the API.</li>
  <li>Sometimes accounts might report invalid data. For example if someone has blocked you, they might not appear in other account's follower list, and therefore show an invalid follower count.</li>
    <li>No accounts have been banned from using the app, but use at your own risk.</li>
  <li>Login details are not asked and not saved anywhere, so they will stay safe.</li>
</ul>

## Contact
<a href="mailto:niilo@poutanen.dev">niilo@poutanen.dev</a>

<p>Not in any way associated with Meta Platforms, Inc.</p>
