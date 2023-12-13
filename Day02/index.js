const {readFileSync} = require("fs");

const contents = readFileSync("input.txt").toString("utf-8");
const lines = contents.split('\n');

const cubes = {
    red: 12,
    green: 13,
    blue: 14
}

const games = [];

function parseLine(line) {
    const [gameId, results] = line.split(":");
    const subsets = results.split(";");

    return {
        gameId: Number.parseInt(gameId.match(/\d+/)[0]),
        subsets: subsets.map(subset => {

            const subsetObject = {};

            const draw = subset.split(",").map(d => d.trim());
            for (d of draw) {
                [_, num, colour] = d.match(/(\d+)\s(\w+)/);
                subsetObject[colour] = Number.parseInt(num)
            }

            return subsetObject;

        })
    }

}

for (line of lines) {
    games.push(parseLine(line));
}

const possibleGames = [];

for (let game of games) {
    let possible = true;
    for (let subset of game.subsets) {
        for (let draw of Object.keys(subset)) {
            if (subset[draw] > cubes[draw]) {
                console.log(`Game ${game.gameId} is impossible, since ${draw}: ${subset[draw]} > ${draw}: ${cubes[draw]}`)
                possible = false;
                break;
            }
        }
        if (!possible) {
            break;
        }
    }
    if (possible) {
        possibleGames.push(game.gameId)
    }
}

console.log(possibleGames.reduce((prev, curr) => prev + curr, 0));