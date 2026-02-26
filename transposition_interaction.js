// ==================== TRANSPOSITION CIPHER ====================

/**
 * Get the order of columns based on keyword
 * @param {string} keyword - The keyword to determine column order
 * @returns {number[]} - Array of indices in sorted order
 */
function getKeyOrder(keyword) {
    let order = [];
    let keyArr = keyword.toUpperCase().split('');
    
    // Initialize order array
    for (let i = 0; i < keyArr.length; i++) {
        order.push(i);
    }
    
    // Sort indices based on character order
    order.sort((a, b) => keyArr[a].localeCompare(keyArr[b]));
    return order;
}

/**
 * Transposition Cipher - Rearranges text based on keyword
 * @param {string} text - Text to encrypt/decrypt
 * @param {string} keyword - Keyword for column ordering
 * @param {boolean} decrypt - If true, decrypt instead of encrypt
 * @returns {string} - Encrypted or decrypted text
 */
function transposition(text, keyword, decrypt = false) {
    const keyLen = keyword.length;
    const keyOrder = getKeyOrder(keyword);
    
    if (decrypt) {
        const textLen = text.length;
        const colLen = textLen / keyLen;
        
        // Split encrypted text into columns
        let encColumns = Array(keyLen).fill('').map(() => '');
        let idx = 0;
        
        for (let i = 0; i < keyLen; i++) {
            for (let j = 0; j < colLen; j++) {
                encColumns[keyOrder[i]] += text[idx++];
            }
        }
        
        // Read row by row
        let result = '';
        for (let i = 0; i < colLen; i++) {
            for (let j = 0; j < keyLen; j++) {
                result += encColumns[j][i];
            }
        }
        
        return result.trim();
    } else {
        // Pad text if necessary
        let padded = text;
        while (padded.length % keyLen !== 0) {
            padded += ' ';
        }
        
        // Create columns
        let columns = Array(keyLen).fill('').map(() => '');
        for (let i = 0; i < padded.length; i++) {
            columns[i % keyLen] += padded[i];
        }
        
        // Rearrange based on key order
        let result = '';
        for (let i = 0; i < keyLen; i++) {
            result += columns[keyOrder[i]];
        }
        
        return result;
    }
}

/**
 * Encrypt text using Transposition Cipher
 */
function transpositionEncrypt() {
    const text = document.getElementById('trans-text').value;
    const keyword = document.getElementById('trans-key').value;
    
    if (!text || !keyword) {
        showStatus('transposition-result', '❌ Please enter both message and keyword', 'error');
        return;
    }
    
    if (!/^[a-zA-Z]+$/.test(keyword)) {
        showStatus('transposition-result', '❌ Keyword must contain only letters', 'error');
        return;
    }
    
    const result = transposition(text, keyword, false);
    displayResult('transposition-result', result);
}

/**
 * Decrypt text using Transposition Cipher
 */
function transpositionDecrypt() {
    const text = document.getElementById('trans-text').value;
    const keyword = document.getElementById('trans-key').value;
    
    if (!text || !keyword) {
        showStatus('transposition-result', '❌ Please enter both message and keyword', 'error');
        return;
    }
    
    if (!/^[a-zA-Z]+$/.test(keyword)) {
        showStatus('transposition-result', '❌ Keyword must contain only letters', 'error');
        return;
    }
    
    const result = transposition(text, keyword, true);
    displayResult('transposition-result', result);
}import {transpositionCipherDecrypt, transpositionCipherEncrypt} from './transposition-cipher.js';

const transpositionCipherEncryptButton = document.getElementById('transposition-encrypt-btn');
const transpositionCipherDecryptButton = document.getElementById('transposition-decrypt-btn');
const transpositionInput = document.getElementById('transposition-input');
const transpositionKey = document.getElementById('transposition-key');
const transpositionResult = document.getElementById('transposition-result');

transpositionCipherEncryptButton.addEventListener('click', () => {
    const plaintext = transpositionInput.value;
    const key = transpositionKey.value;
    const ciphertext = transpositionCipherEncrypt(plaintext, key);
    transpositionResult.innerHTML = `${ciphertext}`;
    transpositionResult.value = ciphertext;
});

transpositionCipherDecryptButton.addEventListener('click', () => {
    const ciphertext = transpositionInput.value;
    const key = transpositionKey.value;
    const plaintext = transpositionCipherDecrypt(ciphertext, key);
    transpositionResult.innerHTML = `${plaintext}`;
    transpositionResult.value = plaintext;
});