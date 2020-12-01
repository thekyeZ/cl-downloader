const { execSync } = require("child_process");
const fs = require("fs");

let myArgs = process.argv.slice(2);
let repoName = "ONL_FER_W_03_Prework_-_JavaScript";

const updateMode = myArgs.includes('-u');
const repoArg = myArgs.indexOf('-r');

if (repoArg !== -1) repoName = myArgs[repoArg + 1];

successMessage(repoName, updateMode);

fs.readFile("users.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  const users = data.split("\n").map((u) => u.replace("\r", ""));
  successMessage(`Odczytano kursantów(${users.length}): ${users.join()}`);
  executeCommandSync('mkdir repos');

  users.forEach((user) => {
    const link = `https://github.com/${user}/${repoName}.git`;

    if (updateMode) {
      updateRepos(user);
    } else {
      if (isCloned(user)) {
        updateRepos(user);
      } else {
        cloneForUser(link, user);
      }
    }
  });
});

function isCloned(user) {
  let isCloned;

  executeCommandSync(`ls -al ./repos/${user}`, (stdout, error) => {
    if(error) {
      isCloned = false;
    } else {
      isCloned = stdout.includes(".git");
    }
  });

  return isCloned;
}

function updateRepos(user) {
  executeCommandSync(`git -C ./repos/${user} pull`);
}

function cloneForUser(link, user) {
  executeCommandSync(`mkdir ./repos/${user}`, (output) => {
    executeCommandSync(`git clone ${link} ./repos/${user}`);
  });
}

function executeCommandSync(command, callback) {
  try {
    let output = execSync(command);
    if (callback && typeof callback === "function") {
      callback(output);
    } else {
      successMessage(`stdout: ${output}`);
    }
  } catch(e) {
    if (callback && typeof callback === "function") {
      callback('', 'error');
    } else {
      return;
    }
  }
}

function successMessage(...msg) {
  console.log(`\x1b[32m%s\x1b[0m`, msg.join());
}
