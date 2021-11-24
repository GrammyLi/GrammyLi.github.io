/*
 * @Author: your name
 * @Date: 2021-10-12 10:46:59
 * @LastEditTime: 2021-10-14 21:18:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/led/font.js
 */
class Font {
    construct() {

    }

    static wordBitsFromDataAscii(word) {
        if (word < 32 || 126 < word) {
            word = 32
        }
        let offset = word * 16 + 1
        let bytes = dataAscii.slice(offset, offset + 16)
        let bits = bitsFromBytes(bytes)
        let wordBits = []
        for (let i = 0; i < 16; i++) {
            let start = i * 8
            let end = start + 8
            let row = bits.slice(start, end)
            wordBits.push(row)
        }

        return wordBits
    }

    static wordBitsFromDataGbk(word) {
        let dcode = word[0] - 0xa0
        let bcode = word[1] - 0xa0
        let offset = (94 * (dcode - 1) + (bcode - 1)) * 32
        let bytes = dataGbk.slice(offset, offset + 32)
        let bits = bitsFromBytes(bytes)
        let wordBits = []
        for (let i = 0; i < 16; i++) {
            let start = i * 16
            let end = start + 16
            let row = bits.slice(start, end)
            wordBits.push(row)
        }

        return wordBits
    }

    static stringBitsFromString(s) {
        s = GBK.encode(s)
        let i = 0
        let stringBits = []
        while (i < s.length) {
            if (s[i] < 128) {
                // 符号
                let word = s[i]
                let bits = Font.wordBitsFromDataAscii(word)
                stringBits.push(bits)
                i += 1
            } else {
                // 汉字
                let word = s.slice(i, i + 2)
                let bits = Font.wordBitsFromDataGbk(word)
                stringBits.push(bits)
                i += 2
            }
        }

        stringBits = mergeStringBits(stringBits, 32, 16)

        return stringBits
    }
}
