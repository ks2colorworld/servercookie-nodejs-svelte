<script>
  import { onMount } from 'svelte';
  import { readable, writable } from 'svelte/store';

  let responseData = writable('');

  const fetchData = async (url, message) => {
    try {
      // HTTP GET 요청
      const response = await fetch(url, {
        method: 'GET', 
        credentials: 'include'
      });

      // 응답값을 JSON 형식으로 파싱
      const data = await response.json();

      // 응답값을 변수에 할당
      responseData.update(prev => `${message}\n${JSON.stringify(data, null, 2)}\n${prev}`);
    } catch (error) {
      console.error('에러 발생:', error);
      responseData.update(prev => `${message}\n에러가 발생했습니다.\n${prev}`);
    }
  };
</script>

<main>
  <h3>http://127.0.0.1:3000 get (username=kslee)</h3>
  <p>
    <button on:click={() => fetchData('http://127.0.0.1:3000/1?username=kslee', '응답값1')}>GET 요청 (쿠키설정) - 응답값1</button>
  </p>
  <h3>https://127.0.0.1:3001 get (username=leekeunsouk)</h3>
  <p>
    <button on:click={() => fetchData('https://127.0.0.1:3001/1?username=leekeunsouk', '응답값1')}>GET 요청 (쿠키설정) - 응답값1</button>
  </p>
  <p>
    <button on:click={() => fetchData('http://127.0.0.1:3000/2', '응답값2')}>GET 요청 (쿠키확인) - 응답값2</button>
  </p>
  <pre>{$responseData}</pre>
</main>
