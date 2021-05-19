export async function fetchInvestments(id = '') {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  return await response.json();
}
