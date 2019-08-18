[![Build Status](https://nirdev.visualstudio.com/manage-ports/_apis/build/status/niradler.manage-ports?branchName=master)](https://nirdev.visualstudio.com/manage-ports/_build/latest?definitionId=1&branchName=master)
![GitHub All Releases](https://img.shields.io/github/downloads/niradler/manage-ports/total)
![GitHub issues](https://img.shields.io/github/issues/niradler/manage-ports)

# Manage Ports 
Manage open ports, and killed attached process.

## Usage
```
# cli
npm i -g manage-ports
mp kill -p 8080
```

```
// code
// npm i -S manage-ports
const mp = require('manage-ports')
await mp.killProcessByPort(port)
```
