import bcrypt from 'bcrypt';
import { spawnSync } from 'child_process';
import 'dotenv/config';

const proc = spawnSync('sh', ['-c', 'git branch --show-current'], {
  stdio: 'pipe',
});

const text = await new Response(proc.stdout).text();
const branch = text.trim();

const blacklistedBranches = ['main', 'develop'];

if (blacklistedBranches.includes(branch)) {
  const error = new Error(`Cannot push on branch "${branch}"`);

  const password = process.env.YOU_WONT_GUESS;

  if (password === undefined || password === '') {
    throw error;
  }

  const isMatch = bcrypt.compareSync(
    password,
    '$2b$08$3nPATrC7t678ejOEroU11O.2YO82bOBg8itLmS7LjTaZV75ub32re',
  );

  if (isMatch) {
    process.exit(0);
  }

  throw error;
}

const prefixWhitelist = ['feature/', 'release/', 'hotfix/'];

if (!prefixWhitelist.some((prefix) => branch.startsWith(prefix))) {
  throw new Error(
    `Branch "${branch}" should start with one of ${prefixWhitelist.join(', ')}`,
  );
}

const isLowercase = (txt: string) => txt === txt.toLowerCase();

const casingRegex = /([\dA-Za-z]+)(\/)+([\dA-Za-z]+)((-)*([\dA-Za-z]+))*/;

const match = casingRegex.exec(branch);
const wholeMatch = match?.[0];

if (wholeMatch !== branch || !isLowercase(branch)) {
  throw new Error(
    `Branch "${branch}" should be in kebab-case, e.g. "feature/my-feature"`,
  );
}
