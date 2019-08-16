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
