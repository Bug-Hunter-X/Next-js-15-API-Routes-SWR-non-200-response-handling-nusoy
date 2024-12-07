```javascript
// pages/api/data.js
export default function handler(req, res) {
  // Some logic to fetch data
  const data = fetchData();

  if (req.method === 'GET') {
    res.status(200).json(data);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
```
```javascript
// components/MyComponent.js
import useSWR from 'swr';

function MyComponent() {
  const { data, error } = useSWR('/api/data', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {/* Render data */}
    </div>
  );
}

function fetcher(url) {
  const res = await fetch(url);
  // I made a mistake here previously - I was not handling non-200 responses
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || res.statusText);
  }
  return res.json();
}
```