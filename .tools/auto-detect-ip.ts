/* eslint-disable no-console */
/* eslint-disable unicorn/prevent-abbreviations */
import 'dotenv/config';
import fs from 'node:fs/promises';
import os from 'node:os';

const NETWORK_INTERFACE = process.env.NETWORK_INTERFACE;

if (NETWORK_INTERFACE === undefined) {
  console.error(
    'Could not auto detect IP: NETWORK_INTERFACE env variable is not set',
  );

  process.exit(0);
}

const networkInterfaces = os.networkInterfaces();

const networkInterface = networkInterfaces[NETWORK_INTERFACE];

if (networkInterface) {
  const ipv4 = networkInterface.find((ip) => ip.family === 'IPv4');

  if (ipv4) {
    let file;

    try {
      const envFile = await fs.readFile('./.env.local', { encoding: 'utf8' });

      file = envFile;
    } catch {
      /* empty */
    }

    try {
      const envSampleFile = await fs.readFile('./.env.local.sample', {
        encoding: 'utf8',
      });

      file = envSampleFile;
    } catch {
      /* empty */
    }

    if (file === undefined) {
      console.error('No .env.local or .env.local.sample file found.');

      process.exit(1);
    }

    const [firstRow, ...rows] = file.split('\n');

    const newFirstRow = `HOST="${ipv4.address}" # auto-detected`;

    if (firstRow.startsWith('HOST=')) {
      await fs.writeFile('./.env.local', [newFirstRow, ...rows].join('\n'));
      console.log('Updated .env.local file with auto-detected IP address.');

      process.exit(0);
    }

    await fs.writeFile(
      './.env.local',
      [newFirstRow, firstRow, ...rows].join('\n'),
    );
    console.log('Updated .env.local file with auto-detected IP address.');

    process.exit(0);
  }
} else {
  console.error(
    `Could not auto detect IP: Network interface "${NETWORK_INTERFACE}" not found.`,
  );

  const networkInterfaceData: Array<{
    name: string;
    ip: string;
  }> = [];

  for (const networkInterface in networkInterfaces) {
    const ips = networkInterfaces[networkInterface];
    if (ips) {
      for (const ip of ips) {
        if (!ip.internal && ip.family === 'IPv4') {
          networkInterfaceData.push({
            name: networkInterface,
            ip: ip.address,
          });
        }
      }
    }
  }

  console.error(
    'Suggested network interfaces:',
    networkInterfaceData.map((i) => `\n-> "${i.name}" - ${i.ip}`).join(''),
  );
  console.error(
    'Please set the NETWORK_INTERFACE env variable with the desired network interface name.',
  );

  process.exit(1);
}
