const { readFileSync, writeFileSync } = require("fs")
const { execSync } = require("node:child_process")

const packages = [
    {
        named: `hooks-for-react`
    }
]

execSync(`npm run build`)
let packageJson = readFileSync(`package.json`, `utf-8`)

for (const { named } of packages) {
    packageJson = packageJson.replace(/"name":.+,/, `"name": "${named}",`)
    writeFileSync(`package.json`, packageJson, `utf-8`)
    execSync(`npm publish`)
}