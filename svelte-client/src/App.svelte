<script>
  import { onMount } from 'svelte';
  import { readable, writable } from 'svelte/store';

  let responseData = writable('');

  const fetchData = async (url, message) => {
    try {
      // HTTP GET 요청
      const response = await fetch(url, {
        method: 'GET', credentials: 'include'
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
  <h1>Svelte HTTP GET 요청 예제</h1>
  <button on:click={() => fetchData('http://localhost:3000/1', '응답값1')}>GET 요청 - 응답값1</button>
  <button on:click={() => fetchData('http://localhost:3000/2', '응답값2')}>GET 요청 - 응답값2</button>
  <pre>{$responseData}</pre>
</main>
