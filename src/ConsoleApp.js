const { askQuestion } = require("./Common/ConsoleFunctions");
const StudentMenu = require("./ConsoleMenus/StudentMenu")

async function Program() {
    // Welcome Message
    await MainMenu();
    // Thank you message
}

async function MainMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");
        let userInput = await askQuestion("Select an option from above: ");
        switch (userInput) {
            case "1":
                await StudentMenu();
                break;
            case "2":
                break;
            case "3":
                shouldLoop = false;
                break;
            default:
                console.log("Error: Could not read user input. Please enter a number from 1 to 3");
        }
    }
}

Program().then(() => {
    process.exit(0);
});
