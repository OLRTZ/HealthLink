const getPort = require('get-port').default;
const { spawn } = require('child_process');

async function main() {
  const preferredPorts = [
    19000, 19001, 19002, 19003, 19004, 19005, 19006, 19007, 19008, 19009, 19010,
    8081, 8082, 8083, 8084, 8085, 8086,
  ];

  const port = await getPort({ port: preferredPorts });

  console.log(`[expo] Using port ${port}`);

  const child = spawn(
    process.platform === 'win32' ? 'cmd.exe' : 'npx',
    process.platform === 'win32'
      ? ['/d', '/s', '/c', 'npx expo start --clear --lan --port ' + String(port)]
      : ['expo', 'start', '--clear', '--lan', '--port', String(port)],
    { stdio: 'inherit', windowsVerbatimArguments: process.platform === 'win32' },
  );

  child.on('exit', (code) => process.exit(code ?? 0));
  child.on('error', (error) => {
    console.error('[expo] Failed to launch Expo CLI.', error);
    process.exit(1);
  });
}

main().catch((error) => {
  console.error('[expo] Unexpected error starting Expo.', error);
  process.exit(1);
});

