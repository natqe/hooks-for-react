const { readFileSync, writeFileSync } = require("fs")
const { execSync } = require("node:child_process")

const packages = [
    {
        named: `hooks-for-react`
    }
]

execSync(`npm run build`)
let packageJson = readFileSync(`build/package.json`, `utf-8`)

for (const { named } of packages) {
    packageJson = packageJson.replace(/"name":.+,/, `"name": "${named}",`)
    writeFileSync(`build/package.json`, packageJson, `utf-8`)
    execSync(`cd build/ && npm publish && cd ../`)
}