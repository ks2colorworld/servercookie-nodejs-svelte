### node version : `18.8.2`

## server : 

1. `cd nodejs-server/`
2. `npm i`
3. (if necessary) `npm i -g nodemon`
4. `npm run dev` 
5. `http://localhost:3000` (`same-domain-http` branch) [link](https://github.com/ks2colorworld/servercookie-nodejs-svelte/tree/same-domain-http)
    - ### (if https) `https://127.0.0.1:3001` (`main` branch) + need https settings ([issue#1](https://github.com/ks2colorworld/servercookie-nodejs-svelte/issues/1))

## client : 

1. `cd svelte-client/`
2. `npm i`
3. `npm run dev` 
4. `http://localhost:8080` (`same-domain-http` branch) [link](https://github.com/ks2colorworld/servercookie-nodejs-svelte/tree/same-domain-http)
    - ### (if https) `https://localhost:8080` (`main` branch) + need https settings ([issue#1](https://github.com/ks2colorworld/servercookie-nodejs-svelte/issues/1))


## Deploy demo : 
- ### target branch name : [deploy-render.com](https://github.com/ks2colorworld/servercookie-nodejs-svelte/tree/deploy-render.com)
- client
    - https://server-cookie-client.onrender.com/
    - http://localhost:8080 (if you build & run locally)

- server (very slow when running for the first time)
    - (response server-cookie)[https://server-cookie.onrender.com/1](https://server-cookie.onrender.com/1)
    - (request server-cookie)[https://server-cookie.onrender.com/2](https://server-cookie.onrender.com/2)
