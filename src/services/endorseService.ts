export async function translateEndorse(input: Record<string, any>) {
  const response = await fetch("http://localhost:3000/endorse/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Error al traducir");
  return response.json();
}