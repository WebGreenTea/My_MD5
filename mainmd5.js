str = 'They are deterministic'
//str = 'hell'
//str = 'Cryptographyxyz456'
re = md_5(str)
// console.log(re)
// console.log(typeof(re))
// console.log(re.length)
// console.log(re.length*8)
console.log(re)





function md_5(str){
    A = 0x01234567n
    B = 0x89abcdefn
    C = 0xfedcba98n
    D = 0x76543210n
    // A = 0x67452301n
    // B = 0xEFCDAB89n
    // C = 0x98BADCFEn
    // D = 0x10325476n
    let _M = []
    let _K = []
    //defind K
    for(let i =0;i<64;i++){
        _K.push(BigInt(Math.floor((Math.abs(Math.sin(i+1)))*Math.pow(2,32))))
    }
    console.log("K(Hex) -->",_K.map(function(x){return x.toString(16)}))


    //create data block
    let bitofstr =  str.split('').map(function(char){
        binary =  char.charCodeAt(0).toString(2)
        while(binary.length < 8){
            binary='0'+binary
        }
        return binary
        //return char.charCodeAt(0).toString(2);
    })
    let strBinary_len = bitofstr.length*8
    if(bitofstr.length < 56){
        bitofstr.push('10000000')
        while(bitofstr.length < 56){
            bitofstr.push('00000000')
        }
    }


    let Binary_len_BIN = strBinary_len.toString(2)
    while(Binary_len_BIN.length % 8 != 0){
        Binary_len_BIN = '0'+Binary_len_BIN
    }
    Binary_len_BIN = Binary_len_BIN.match(/.{8}/g).join(' ').split(' ')

    //console.log(Binary_len_BIN)
    while(bitofstr.length < (64-Binary_len_BIN.length)){
        bitofstr.push('00000000')
    }
    let DataBlock =  bitofstr.concat(Binary_len_BIN)
    console.log("DATA_BLOCK -->",DataBlock)
    _M = DataBlock.join('').match(/.{32}/g).join(' ').split(' ').map(function(x){
        return parseInt(x, 2);
    })
    console.log("M(Hex) -->",_M.map(function(x){return x.toString(16)}))

    
    let a = A;
    let b = B;
    let c = C;
    let d = D;
    let Round = 1
    let s = 0
    while(Round<=4){
        for(let i = 0;i<16;i++){
            s++;
            console.log('Round '+Round+' '+'S'+(s)+' :')
            let f = 0
            if(Round == 1){
                f = ((b & c)|(~b & d))
                console.log('\tF function is (B AND C)OR(NOT(B) AND D) --->',f.toString(16))
            }else if(Round ==2){
                f = ((b & d)|(c & ~d))
                console.log('\tF function is (B AND D)OR(C AND NOT(D)) --->',f.toString(16))
            }else if(Round ==3){
                f = (b ^ c ^ d)
                console.log('\tF function is B XOR C XOR D --->',f.toString(16))
            }else{
                f = (c ^ (b | ~d))
                console.log('\tF function is C XOR (B OR NOT(D)) --->',f.toString(16))
            }
             

            //mod1
            let mod1 = (a + f)% 0x100000000n
            console.log('\tMod1:',mod1.toString(16))

            //mod2
            let mod2 = (BigInt(_M[i])+mod1)% 0x100000000n
            console.log('\tMod2:',mod2.toString(16))

            //mod3
            let mod3 = (_K[i]+mod2)%0x100000000n
            console.log('\tMod3:',mod3.toString(16))

            //Left bit-shift
            let shift = countOfShiftLeft(s)
            mod3 = shiftbit32Circular(mod3,shift)
            console.log('\tMod3 shift bit ',shift,':',mod3.toString(16))
            //mod3 = 0xe984f895

            //mod4
            let mod4 = (B+BigInt(mod3))% 0x100000000n
            console.log('\tMod4:',mod4.toString(16))


            //new a,b,c,d
            a = d
            d = c
            c = b
            b = mod4
            console.log('\t\tA = ',a.toString(16))
            console.log('\t\tB = ',b.toString(16))
            console.log('\t\tC = ',c.toString(16))
            console.log('\t\tD = ',d.toString(16))
            
        }
        Round++;
        console.log(Round)
    }
    a = (a+A)%0x100000000n
    b = (b+B)%0x100000000n
    c = (c+C)%0x100000000n
    d = (d+D)%0x100000000n
    let finalResult = a.toString(16)+b.toString(16)+c.toString(16)+d.toString(16)



    return finalResult
}

function shiftbit32Circular(value,sh){
    value = value.toString(2)
    while(value.length < 32){
        value = '0'+value
    }
    //console.log(value.toString(2))
    let re = value.slice(sh,value.length) + value.slice(0,sh)
    //console.log(value.toString(2))
    return parseInt(re,2);
}

function countOfShiftLeft(r){
    sh = [7,12,17,22,5,9,14,20,4,11,16,13,6,10,15,21]
    start = 1
    l = start
    index = 0
    if(r>64){
        return -1;
    }
    while(l != r && l<64){
        if(l%16 == 0){
            start=l+1
            l=start
            index++;
        }else{
            l = l+4
            if(l-start > 12){
                index++;
                start++;
                l=start
            }
        }
        //console.log('start',start,':l',l)
        

    }
    return sh[index]
    // if([1,5,9,13].includes(r)){
    //     return 7;
    // }else if([2,6,10,14]){

    // }
}





