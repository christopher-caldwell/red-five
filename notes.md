# Notes

## Getting and formatting info

```js
connectionInfo.info = serverInfo.split('\n').map(function (line) {
  line = line.trim()
  let parts = line.split(':')
  return {
    key: inflection.humanize(parts[0]),
    value: parts.slice(1).join(':')
  }
})
```
