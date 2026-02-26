function transpositionCipherEncrypt(plaintext, key) {
    const numCols = key.length;
    const numRows = Math.ceil(plaintext.length / numCols);
    const paddedPlaintext = plaintext.padEnd(numRows * numCols, ' '); // Pad plaintext to fit the grid
    const grid = [];

    // Fill the grid row by row
    for (let i = 0; i < numRows; i++) {
        grid.push(paddedPlaintext.slice(i * numCols, (i + 1) * numCols));
    }

    // Sort the key and get the column order
    const sortedKey = Array.from(key).map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
    const ciphertext = sortedKey.map(({ index }) => grid.map(row => row[index]).join('')).join('');

    return ciphertext.trim(); // Remove any trailing spaces
}

function transpositionCipherDecrypt(ciphertext, key) {
    const numCols = key.length;
    const numRows = Math.ceil(ciphertext.length / numCols);
    const paddedCiphertext = ciphertext.padEnd(numRows * numCols, ' '); // Pad ciphertext to fit the grid
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

    // Sort the key and get the column order
    const sortedKey = Array.from(key).map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
    const sortedIndices = sortedKey.map(({ index }) => index);

    // Fill the grid column by column
    let charIndex = 0;
    for (let i = 0; i < numCols; i++) {
        const colIndex = sortedIndices[i];
        for (let j = 0; j < numRows; j++) {
            if (charIndex < paddedCiphertext.length) {
                grid[j][colIndex] = paddedCiphertext[charIndex++];
            }
        }
    }

    // Read the grid row by row to reconstruct the plaintext
    return grid.map(row => row.join('')).join('').trim();
}


// Export functions
export { transpositionCipherDecrypt, transpositionCipherEncrypt };