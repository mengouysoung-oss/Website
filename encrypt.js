// ==================== AFFINE CIPHER ====================

/**
 * Affine Cipher - E(x) = (ax + b) mod 26
 * @param {string} text - Text to encrypt (letters only)
 * @param {number} a - First key (must be coprime with 26)
 * @param {number} b - Second key
 * @param {boolean} decrypt - If true, decrypt instead of encrypt
 * @returns {string} - Encrypted or decrypted text
 */
function affine(text, a, b, decrypt = false) {
    if (gcd(a, 26) !== 1) {
        throw new Error('Key a must be coprime with 26');
    }
    
    text = text.toUpperCase();
    let result = "";
    
    if (decrypt) {
        const aInverse = modInverse(a, 26);
        for (let char of text) {
            if (char.match(/[A-Z]/)) {
                let y = char.charCodeAt(0) - 65;
                let decrypted = (aInverse * (y - b + 26)) % 26;
                result += String.fromCharCode(decrypted + 65);
            } else {
                result += char;
            }
        }
    } else {
        for (let char of text) {
            if (char.match(/[A-Z]/)) {
                let x = char.charCodeAt(0) - 65;
                let encrypted = (a * x + b) % 26;
                result += String.fromCharCode(encrypted + 65);
            } else {
                result += char;
            }
        }
    }
    
    return result;
}

/**
 * Encrypt text using Affine Cipher
 */
function affineEncrypt() {
    const text = document.getElementById('affine-text').value;
    const a = parseInt(document.getElementById('affine-a').value);
    const b = parseInt(document.getElementById('affine-b').value);
    
    if (!text) {
        showStatus('affine-result', '❌ Please enter a message', 'error');
        return;
    }
    
    try {
        const result = affine(text, a, b, false);
        displayResult('affine-result', result);
    } catch (error) {
        showStatus('affine-result', `❌ ${error.message}. Valid a: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 25`, 'error');
    }
}

/**
 * Decrypt text using Affine Cipher
 */
function affineDecrypt() {
    const text = document.getElementById('affine-text').value;
    const a = parseInt(document.getElementById('affine-a').value);
    const b = parseInt(document.getElementById('affine-b').value);
    
    if (!text) {
        showStatus('affine-result', '❌ Please enter a message', 'error');
        return;
    }
    
    try {
        const result = affine(text, a, b, true);
        displayResult('affine-result', result);
    } catch (error) {
        showStatus('affine-result', `❌ ${error.message}. Valid a: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 25`, 'error');
    }
}