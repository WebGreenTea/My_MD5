
md5 = require('md5')
str = 'They are deterministic'
//str = 'Cryptographyxyz456'
re = md_5(str)
// console.log(re)
// console.log(typeof(re))
// console.log(re.length)
// console.log(re.length*8)






function md_5(str){
    A = 0x01234567n
    B = 0x89abcdefn
    C = 0xfedcba98n
    D = 0x76543210n
    let _M = []
    let _K = []
    //defind K
    for(let i =0;i<64;i++){
        _K.push(BigInt(Math.floor((Math.abs(Math.sin(0+1)))*Math.pow(2,32))))
    }


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
            let f = 0
            if(Round == 1){
                f = ((b & c)|(~b & d))
            }else if(Round ==2){
                f = ((b & d)|(c & ~d))
            }else if(Round ==3){
                f = (b ^ c ^ d)
            }else{
                f = (c ^ (b | ~d))
            }
            console.log('Round '+Round+' '+i+' operations : F-->'+f.toString(16))

            //mod1
            let mod1 = (a + f)
            console.log('\tMod1:',mod1.toString(16))

            //mod2
            let mod2 = (BigInt(_M[i])+mod1)% 0x100000000n
            console.log('\tMod2:',mod2.toString(16))

            //mod3
            let mod3 = (_K[i]+mod2)%0x100000000n
            console.log('\tMod3:',mod3.toString(16))

            //Left bit-shift

            
        }
        Round++;
        console.log(Round)
    }


    return DataBlock
}

function countOfShiftLeft(r){
    if([1,5,9,13].includes(r)){
        return 7;
    }else if([2,6,10,14]){

    }
}





console.log(md5(str))