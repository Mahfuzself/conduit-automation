import fs from 'fs';

const authFile = 'playwright/.auth/user.json';

export function getToken(): string {
  const state = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
  const origin = state.origins.find((o: { origin: string }) => o.origin === process.env.BASE_URL);
  const token = origin?.localStorage.find((item: { name: string }) => item.name === 'jwtToken')?.value;
  if (!token) throw new Error(`jwtToken not found in ${authFile}`);
  return token;
}
