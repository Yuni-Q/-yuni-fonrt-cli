const readline = require('readline');
const chalk = require('chalk');
const { exec, echo, cd, cp } = require('shelljs');

(async () => {
  const checkSameBranch = new Promise((resolve) => {
    if (!process.argv[2]) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(`\n앱의 이름을 선택해 주세요 : `, (answer) => {
        resolve((answer));
        rl.close();
      });
    }
  });

  const appName = process.argv[2] || await checkSameBranch;
  if (!appName) {
    echo(chalk.red('\n스크립트를 종료합니다.'));
    return;
  }

  const commandPull = `git clone https://github.com/Yuni-Q/template.git ${appName}`
  echo(chalk.blue('프로젝트를 clone 받습니다.'), commandPull);
  exec(commandPull, { silent: true }).stdout.replace(/\n/, '');

  cd(`./${appName}`)
  cp('-f', `.env_default`, `.env`)

  echo(chalk.blue(`\n${appName}이 생성 되었습니다.`));
  echo(chalk.blue(`cd ${appName}`));
  echo(chalk.blue(`npm i`));
  echo(chalk.blue(`npm run start:dev`));
})()




