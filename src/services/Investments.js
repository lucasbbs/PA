export async function fetchInvestments(id = '') {
  const response = await fetch(
    `https://my-json-server.typicode.com/lucasbbs/JSONWebServerPlaceholder_Online/products/${id}`
  );
  return await response.json();
}
