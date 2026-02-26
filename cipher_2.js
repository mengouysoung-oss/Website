function shift_cipher_encryption(plaintext, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ciphertext = '';

    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i].toUpperCase();
        const index = alphabet.indexOf(char);

        if (index !== -1) {
            const newIndex = (index + shift) % 26;
            ciphertext += alphabet[newIndex];
        } else {
            ciphertext += char;
        }
    }

    return ciphertext;
}

function shift_cipher_decryption(ciphertext, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i].toUpperCase();
        const index = alphabet.indexOf(char);

        if (index !== -1) {
            const newIndex = (index - shift + 26) % 26; 
            plaintext += alphabet[newIndex];
        } else {
            plaintext += char; 
        }
    }

    return plaintext;
}

function caesar_brute_force_decrypt(ciphertext) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const results = [];

    for (let shift = 1; shift < 26; shift++) {
        let plaintext = '';

        for (let i = 0; i < ciphertext.length; i++) {
            const char = ciphertext[i].toUpperCase();
            const index = alphabet.indexOf(char);

            if (index !== -1) {
                const newIndex = (index - shift + 26) % 26;
                plaintext += alphabet[newIndex];
            } else {
                plaintext += char;
            }
        }

        results.push({ shift, plaintext });
    }

    return results;
}

export { shift_cipher_encryption, shift_cipher_decryption, caesar_brute_force_decrypt};