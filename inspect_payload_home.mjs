import fs from 'fs';

const payloadPath = 'C:\\Users\\adity\\.gemini\\antigravity-ide\\brain\\92336355-d9da-4dca-a3ae-c975e2b28b74\\scratch\\payload_home.json';
if (fs.existsSync(payloadPath)) {
  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  console.log('Payload keys:', Object.keys(payload));
  // Find classes
  const str = JSON.stringify(payload);
  console.log('Classes mentioned in payload:');
  const matches = [...str.matchAll(/"name":"([^"]+)"/g)].map(m => m[1]);
  console.log('Names found:', matches);
} else {
  console.log('payload_home.json does not exist at path');
}
