<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import axios from 'axios';

	let name = process.env.APP_NAME;
  let responseData = writable('');

  onMount(()=>{
    // Input
    console.log(process.env.APP_NAME);
    console.log(process.env.DEBUG); 
    // process.env.APP_NAME = '1111';
    // process.env.DEBUG = false;
    // process.env.DEBUG = true;
    if (process.env.DEBUG == true) { // https://www.npmjs.com/package/@rollup/plugin-replace
    // if (process.env.DEBUG == false) {
      console.log(process.env.DEBUG);
    }
  });
  const fetchData = async (url, message) => {
    try {

        // HTTP GET 요청
        // const response = await fetch(url, {
        //   method: 'GET',
        //   credentials: 'include',
        // });

        const response = await axios.get(url, { withCredentials: true });

      // 응답값을 JSON 형식으로 파싱
      // const data = await response.json();

      // 응답값을 변수에 할당
      // responseData.update(prev => `${message}\n${JSON.stringify(data, null, 2)}\n${prev}`);
      responseData.update(prev => `${message}\n${JSON.stringify(response.data, null, 2)}\n${prev}`);
    } catch (error) {
      console.error('에러 발생:', error);
      responseData.update(prev => `${message}\n에러가 발생했습니다.\n${prev}`);
    }
  };

  const fetchDataPost = async (url, username, message) => {
    try {
      const reqData = {
        data: {
          username: username,
        },
      };
      const response = await axios.post(url,reqData, { withCredentials: true });

      responseData.update(prev => `${message}\n${JSON.stringify(response.data, null, 2)}\n${prev}`);
    } catch (error) {
      console.error('에러 발생:', error);
      responseData.update(prev => `${message}\n에러가 발생했습니다.\n${prev}`);
    }
  };
</script>

<main>
  <h1>Hello {name}!</h1>
  <h3>http://127.0.0.1:3000 get (username=kslee)</h3>
  <p>
    <button on:click={() => fetchData('http://127.0.0.1:3000/1?username=kslee', '응답값1')}>GET 요청 (쿠키설정) - 응답값1</button>
  </p>
  <h3>https://127.0.0.1:3001 get (username=leekeunsouk)</h3>
  <p>
    <button on:click={() => fetchData('https://127.0.0.1:3001/1?username=leekeunsouk', '응답값2')}>GET 요청 (쿠키설정) - 응답값2</button>
  </p>
  <h3>http://127.0.0.1:3000/3 post (username=mikeyLee)</h3>
  <p>
    <button on:click={() => fetchDataPost('http://127.0.0.1:3000/3', 'mikeyLee', '응답값3')}>POST 요청 (쿠키설정) - 응답값3</button>
  </p>
  <h3>https://127.0.0.1:3001/3 post (username=ks2lee)</h3>
  <p>
    <button on:click={() => fetchDataPost('https://127.0.0.1:3001/3', 'ks2lee', '응답값4')}>POST 요청 (쿠키설정) - 응답값4</button>
  </p>
  <p>
    <button on:click={() => fetchData('http://127.0.0.1:3000/2', '응답값5')}>GET 요청 (쿠키확인) - 응답값5</button>
  </p>
  <pre>{$responseData}</pre>
</main>
