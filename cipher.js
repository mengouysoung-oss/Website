function affineCipherEncrypt(plaintext, a, b) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const mod = alphabet.length;
    let ciphertext = '';

    for (let char of plaintext.toUpperCase()) {
        if (alphabet.includes(char)) {
            const x = alphabet.indexOf(char);
            const y = (a * x + b) % mod;
            ciphertext += alphabet[y];
        } else {
            ciphertext += char; // Non-alphabet characters are unchanged
        }
    }

    return ciphertext;
}

function affineCipherDecrypt(ciphertext, a, b) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const mod = alphabet.length;
    let plaintext = '';

    // Find the modular inverse of a under mod
    const aInverse = modInverse(a, mod);

    for (let char of ciphertext.toUpperCase()) {
        if (alphabet.includes(char)) {
            const y = alphabet.indexOf(char);
            const x = (aInverse * (y - b + mod)) % mod;
            plaintext += alphabet[x];
        } else {
            plaintext += char; // Non-alphabet characters are unchanged
        }
    }

    return plaintext;
}

function affine_brute_force_decrypt(ciphertext) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const results = [];

    for (let a = 1; a < 26; a++) {
        if (gcd(a, 26) === 1) { // Check if a is coprime with 26
            for (let b = 0; b < 26; b++) {
                let plaintext = '';

                for (let char of ciphertext.toUpperCase()) {
                    if (alphabet.includes(char)) {
                        const y = alphabet.indexOf(char);
                        const x = (modInverse(a, 26) * (y - b + 26)) % 26;
                        plaintext += alphabet[x];
                    } else {
                        plaintext += char; // Non-alphabet characters are unchanged
                    }
                }

                results.push({ a, b, plaintext });
            }
        }
    }

    return results;
}

function gcd(a, b) {
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1; // No modular inverse exists
}

export {affineCipherEncrypt, affineCipherDecrypt, affine_brute_force_decrypt};
