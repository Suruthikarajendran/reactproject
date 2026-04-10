const { execSync } = require('child_process');
try {
  const result = execSync('npm run build', { stdio: 'pipe' });
  console.log(result.toString());
} catch (error) {
  const fs = require('fs');
  fs.writeFileSync('build_debug.txt', error.stdout.toString() + '\\n------\\n' + error.stderr.toString());
  console.error('Failed. Wrote to build_debug.txt');
}
