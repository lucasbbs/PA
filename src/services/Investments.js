export async function fetchInvestments() {
  const response = await fetch('http://localhost:3000/products');
  return await response.json();
}
