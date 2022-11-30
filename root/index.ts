#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import receipt from "./withDrawrep.js";
import tsreceipt from "./transferreceipt.js";
import welcome from "./welcome.js";

let pinCheck = true;

let msg = `
    *************************************
    **** Welcome to Mk's ATM-Machine ****
    *************************************
`;

await welcome(msg);

do {
  const answer = await inquirer.prompt([
    {
      name: "userName",
      type: "input",
      message: "Please enter Account Holder Name:",
    },
    {
      name: "pin",
      type: "password",
      message: "Please enter your five digit pin: ",
    },
  ]);

  if (answer.pin.length === 5 && !isNaN(answer.pin)) {
    let avBalance = Math.floor(Math.random() * 1000) + 1;
    let continued = false;

    do {
      const select = await inquirer.prompt([
        {
          name: "option",
          message: "Please select your desire operation: ",
          type: "list",
          choices: ["Balance", "Withdraw", "Transfer"],
        },
      ]);

      if (select.option === "Balance") {
        console.log(chalk.blueBright(`Your Balance is $ ${avBalance}`));

        const usage = await inquirer.prompt({
          name: "useAgain",
          type: "confirm",
          message: "Continue using ATM",
        });

        continued = usage.useAgain;
      } else if (select.option === "Withdraw") {
        let possibleDraw = true;

        do {
          const withDrawBl = await inquirer.prompt({
            name: "wd",
            type: "number",
            message: "Please enter Amount to withdraw",
          });

          if (withDrawBl.wd >= avBalance) {
            console.log(
              chalk.redBright(
                `Entered Amount Should be less than the available Balance $ ${avBalance}`
              )
            );
          } else if (!isNaN(withDrawBl.wd)) {
            avBalance -= withDrawBl.wd;
            possibleDraw = false;

            const printReciept = await inquirer.prompt([
              {
                name: "recieptPrint",
                type: "confirm",
                message: "Do you want receipt to be print",
              },
            ]);

            if (printReciept.recieptPrint) {
              console.log(
                chalk.greenBright(
                  receipt(answer.userName, avBalance, withDrawBl.wd)
                )
              );
            }

            const usage = await inquirer.prompt([
              {
                name: "useAgain",
                type: "confirm",
                message: "Continue using ATM",
              },
            ]);

            continued = usage.useAgain;
          } else {
            console.log(chalk.redBright("Please enter Numbers Only"));
          }
        } while (possibleDraw);
      } else if (select.option === "Transfer") {
        let continueTransfer = true;

        do {
          const tranferWise = await inquirer.prompt([
            {
              name: "transfer",
              type: "number",
              message: "Please Enter amount to Transfer: ",
            },
            {
              name: "ModeOfTrans",
              type: "list",
              message: "Please select the Desire mood of Transfer: ",
              choices: ["Easypaisa", "Omni Bank", "Jazz Cash"],
            },
            {
              name: "ACno",
              type: "number",
              message: "Please enter A/C #: ",
              default: "1234-33443434344",
            },
          ]);

          if (tranferWise.transfer >= avBalance) {
            console.log(
              chalk.redBright(
                `Entered Amount Should be less than the available Balance $ ${avBalance}`
              )
            );
          } else if (!isNaN(tranferWise.transfer)) {
            avBalance -= tranferWise.transfer;
            console.log(
              chalk.greenBright(
                tsreceipt(
                  answer.userName,
                  avBalance,
                  tranferWise.transfer,
                  tranferWise.ModeOfTrans,
                  tranferWise.ACno
                )
              )
            );
            continueTransfer = true;
          } else {
            console.log(chalk.redBright("Please Enter Numbers only"));
            continueTransfer = false;
          }
        } while (!continueTransfer);

        const usage = await inquirer.prompt({
          name: "useAgain",
          type: "confirm",
          message: "Continue using ATM",
        });

        continued = usage.useAgain;
      }
    } while (continued);

    msg = `
          Thank you for using Mk's ATM
     You are always welcome to use it again
     `;

    await welcome(msg);
  } else {
    console.log(
      chalk.redBright("Account Holder Name or pin entered is Incorrect")
    );
    pinCheck = false;
  }
} while (!pinCheck);
