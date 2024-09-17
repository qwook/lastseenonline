const fs = require('fs');
const path = require('path');

// Get all files in the current directory
const files = fs.readdirSync('./');

// Filter for .jsonc files
const jsoncFiles = files.filter(file => path.extname(file) === '.jsonc');

// Convert .jsonc to .json
jsoncFiles.forEach(file => {
    const filePath = path.join('./', file);
    const jsoncContent = fs.readFileSync(filePath, 'utf8');

    // Use eval to parse JSONC
    const jsonData = eval(`(${jsoncContent})`);

    // Stringify the JSON data to format it as valid JSON
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Write the content to a new .json file
    const newFilePath = filePath.replace('.jsonc', '.json');
    fs.writeFileSync(newFilePath, jsonString, 'utf8');

    console.log(`${file} converted to ${newFilePath}`);
});

console.log('Conversion complete.');
