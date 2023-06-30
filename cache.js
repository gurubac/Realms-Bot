const fs = require('fs');

function isJsonNotEmpty(content) {
  try {
    const parsedJson = JSON.parse(content);
    return Array.isArray(parsedJson) ? parsedJson.length > 0 : Object.keys(parsedJson).length > 0;
  } catch (error) {
    return false;
  }
}

function isLoggedIn(cacheDir) {
  const cacheExists = fs.existsSync(cacheDir);
  if (cacheExists) {
    const cacheFiles = fs.readdirSync(cacheDir);
    let isValidCache = false;

    for (const file of cacheFiles) {
      const filePath = `${cacheDir}/${file}`;
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      if (isJsonNotEmpty(fileContent)) {
        isValidCache = true;
        break;
      }
    }

    if (isValidCache) {
      return true;
    }
  }

  return false;
}

module.exports = isLoggedIn;