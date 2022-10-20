str = 'They are deterministickjhkjhkjhkjhkjhkjhkjjhgjhbmndbjahbsdmag'
//str = 'hell'
//str = 'Cryptographyxyz456'
re = md_5(str)
// console.log(re)
// console.log(typeof(re))
// console.log(re.length)
// console.log(re.length*8)
console.log(re)





function md_5(str){
    let A = 0x01234567n
    let B = 0x89abcdefn
    let C = 0xfedcba98n
    let D = 0x76543210n
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

    //create list of datablock (no padding)
    if(bitofstr.length>56){
        
        let temp = []
        let temp2 = []
        for(let i = 0;i<bitofstr.length;i++){
            temp2.push(bitofstr[i])
            
            if(((i+1) % 56 )== 0){
                console.log(99999)
                temp.push(temp2)
                temp2 = []
            }
        }
        if(temp2.length>0){
            temp.push(temp2)
        }
        bitofstr = temp
    }else{
        bitofstr = [bitofstr]
    }
    //console.log('List of Data_BLOCK',bitofstr)

    //padding
    let strBinary_len = []
    for(let i = 0;i<bitofstr.length;i++){
        strBinary_len.push(bitofstr[i].length*8)
        if(bitofstr[i].length < 56){
            bitofstr[i].push('10000000')
            while(bitofstr[i].length < 56){
                bitofstr[i].push('00000000')
            }
        }

    }
    //console.log('List of Data_BLOCK2',bitofstr)



    //+bit length at tail
    for(let i = 0;i<bitofstr.length;i++){
        //let strBinary_len = bitofstr[i].length*8
        console.log('len',strBinary_len[i])
        let Binary_len_BIN = strBinary_len[i].toString(2)//count of bit
        while(Binary_len_BIN.length % 8 != 0){
            Binary_len_BIN = '0'+Binary_len_BIN
        }
        Binary_len_BIN = Binary_len_BIN.match(/.{8}/g).join(' ').split(' ')//split 8bti 8bti 8bit ...
        while(bitofstr[i].length < (64-Binary_len_BIN.length)){
            bitofstr[i].push('00000000')
        }
        bitofstr[i] = bitofstr[i].concat(Binary_len_BIN)
    }

    DataBlockList = bitofstr
    console.log('DataBlockList -->',DataBlockList)

    // let Binary_len_BIN = strBinary_len.toString(2)
    // while(Binary_len_BIN.length % 8 != 0){
    //     Binary_len_BIN = '0'+Binary_len_BIN
    // }
    // Binary_len_BIN = Binary_len_BIN.match(/.{8}/g).join(' ').split(' ')

    // //console.log(Binary_len_BIN)
    // while(bitofstr.length < (64-Binary_len_BIN.length)){
    //     bitofstr.push('00000000')
    // }
    // let DataBlock =  bitofstr.concat(Binary_len_BIN)

    // console.log("DATA_BLOCK -->",DataBlock)
    // _M = DataBlock.join('').match(/.{32}/g).join(' ').split(' ').map(function(x){
    //     return parseInt(x, 2);
    // })
    // console.log("M(Hex) -->",_M.map(function(x){return x.toString(16)}))


    Mindex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
        1,6,11,0,5,10,15,4,9,14,3,8,13,2,7,12,
        5,8,11,14,1,4,7,10,13,0,3,6,9,12,15,2,
        0,7,14,5,12,3,10,1,8,15,6,13,4,11,2,9
    ]
    
    
    
    


    for(let datablockIndex = 0;datablockIndex<DataBlockList.length;datablockIndex++){
        
        // console.log(DataBlockList[datablockIndex].join('').match(/.{32}/g).join(' ').split(' ').map(function(x){
        //     return parseInt(x, 2);
        // }))
        _M.push(DataBlockList[datablockIndex].join('').match(/.{32}/g).map(function(x){
            return parseInt(x, 2);
        }))
    }


    

    // //for log
    // for(let i = 0;i<_M.length;i++){
    //     for(let j = 0;j<_M[i].length;j++){
    //         console.log(_M[i][j])
    //     }
    // }


    console.log("M(Hex) -->",_M.map(function(row){
        return row.map(function(cell){
            return cell.toString(16)
        })
    }))

    //console.log("M(Hex) -->",_M.map(function(x){return x.toString(16)}))

    for(let datablockIndex = 0;datablockIndex<_M.length;datablockIndex++){
        console.log('DATA BLOCK',datablockIndex+1,'/',_M.length)
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
                        console.log('\tF function is (B AND C)OR(NOT(B) AND D)')
                        console.log('\t('+b+' AND '+c+')OR(NOT('+b+') AND '+d+') = '+f.toString(16)+'\n')
                    }else if(Round ==2){
                        f = ((b & d)|(c & ~d))
                        console.log('\tF function is (B AND D)OR(C AND NOT(D))')
                        console.log('\t('+b+' AND '+d+')OR('+c+' AND NOT('+d+')) = '+f.toString(16)+'\n')
                    }else if(Round ==3){
                        f = (b ^ c ^ d)
                        console.log('\tF function is B XOR C XOR D')
                        console.log('\t'+b+' XOR '+c+' XOR '+d+' = '+f.toString(16)+'\n')
                    }else{
                        f = (c ^ (b | ~d))
                        console.log('\tF function is C XOR (B OR NOT(D))')
                        console.log('\t'+c+' XOR ('+b+' OR NOT('+d+')) = '+f.toString(16)+'\n')
                    }
                    

                    //for log
                    let o1,o2,o3;

                    //mod1
                    let mod1 = (a + f)% 0x100000000n
                    o1 = a.toString(16)
                    o2 = f.toString(16)
                    o3 = mod1.toString(16)
                    console.log('\tMod1:\t\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)
                    
                    //mod2
                    let mod2 = (BigInt(_M[datablockIndex][Mindex[s-1]])+mod1)% 0x100000000n
                    o1 = BigInt(_M[datablockIndex][Mindex[s-1]]).toString(16)
                    o2 = mod1.toString(16)
                    o3 = mod2.toString(16)
                    console.log('\tMod2:[M('+Mindex[s-1]+')]\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)

                    //mod3
                    let mod3 = (_K[s-1]+mod2)%0x100000000n
                    o1 = _K[s-1].toString(16)
                    o2 = mod2.toString(16)
                    o3 = mod3.toString(16)
                    console.log('\tMod3:[K('+s+')]\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)

                    //Left bit-shift
                    let shift = countOfShiftLeft(s)
                    o1 = mod3.toString(16)
                    mod3 = shiftbit32Circular(mod3,shift)
                    o2 = shift
                    o3 = mod3.toString(16)
                    console.log('\tSHIFT BIT:\t'+o1+filltab(o1)+'<<\t'+o2+'\t\t=\t'+o3)
                    //mod3 = 0xe984f895

                    //mod4
                    let mod4 = (b+BigInt(mod3))% 0x100000000n
                    o1 = b.toString(16)
                    o2 = mod3.toString(16)
                    o3 = mod4.toString(16)
                    console.log('\tMod4:\t\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)


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
                //console.log(Round)
            }
        A = (a+A)%0x100000000n
        B = (b+B)%0x100000000n
        C = (c+C)%0x100000000n
        D = (d+D)%0x100000000n
        console.log('--------------------------------')
    }
    let finalResult = A.toString(16)+B.toString(16)+C.toString(16)+D.toString(16)
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
function filltab(str){
    if(str.length <= 7){
        return '\t\t'
    }
    return '\t'
}






