```javascript
// pages/api/data.js
export default function handler(req, res) {
  // Some logic to fetch data that might fail
  const data = fetchData();

  if (req.method === 'GET') {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: 'Failed to fetch data' });
    }
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

  if (error) return <div>failed to load: {error.message}</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {/* Render data */}
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.message || res.statusText;
    throw new Error(errorMessage);
  }
  return res.json();
}
```