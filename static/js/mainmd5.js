//str = 'They are deterministic'
//str = 'hell'
//str = 'Cryptographyxyz456'
//re = md_5(str)

//console.log(re)
function md5(str){
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
    let operation = '';//for keep operation

    //defind K
    for(let i =0;i<64;i++){
        _K.push(BigInt(Math.floor((Math.abs(Math.sin(i+1)))*Math.pow(2,32))))
    }
    //log K value
    /*console.log("K(Hex) -->",_K.map(function(x){return x.toString(16)}))*/


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
        //console.log('len',strBinary_len[i])
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
    //log datablock
    /*console.log('DataBlockList -->',DataBlockList)*/

    //define M index
    Mindex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
        1,6,11,0,5,10,15,4,9,14,3,8,13,2,7,12,
        5,8,11,14,1,4,7,10,13,0,3,6,9,12,15,2,
        0,7,14,5,12,3,10,1,8,15,6,13,4,11,2,9
    ]

    //convert datablock to M value
    for(let datablockIndex = 0;datablockIndex<DataBlockList.length;datablockIndex++){
        _M.push(DataBlockList[datablockIndex].join('').match(/.{32}/g).map(function(x){
            return parseInt(x, 2);
        }))
    }

    //log M value
    /*console.log("M(Hex) -->",_M.map(function(row){
        return row.map(function(cell){
            return cell.toString(16)
        })
    }))*/


    for(let datablockIndex = 0;datablockIndex<_M.length;datablockIndex++){
        //console.log('DATA BLOCK '+datablockIndex+1+'/'+_M.length)
        operation += logAndMakeStr('DATA BLOCK '+(datablockIndex+1)+'/'+_M.length)
        let a = A;
        let b = B;
        let c = C;
        let d = D;
        let Round = 1
        let s = 0
        while(Round<=4){
                for(let i = 0;i<16;i++){
                    s++;
                    //console.log('Round '+Round+' '+'S'+(s)+' :')
                    operation += logAndMakeStr('Round '+Round+' '+'S'+(s)+' :')

                    let f = 0
                    if(Round == 1){
                        f = ((b & c)|(~b & d))
                        //console.log('\tF function is (B AND C)OR(NOT(B) AND D)')
                        //console.log('\t('+b.toString(16)+' AND '+c.toString(16)+')OR(NOT('+b.toString(16)+') AND '+d.toString(16)+') = '+f.toString(16)+'\n')
                        operation += logAndMakeStr('\tF function is (B AND C)OR(NOT(B) AND D)')
                        operation += logAndMakeStr('\t('+b.toString(16)+' AND '+c.toString(16)+')OR(NOT('+b.toString(16)+') AND '+d.toString(16)+') = '+f.toString(16))
                    }else if(Round ==2){
                        f = ((b & d)|(c & ~d))
                        //console.log('\tF function is (B AND D)OR(C AND NOT(D))')
                        //console.log('\t('+b.toString(16)+' AND '+d.toString(16)+')OR('+c.toString(16)+' AND NOT('+d.toString(16)+')) = '+f.toString(16)+'\n')
                        operation += logAndMakeStr('\tF function is (B AND D)OR(C AND NOT(D))')
                        operation += logAndMakeStr('\t('+b.toString(16)+' AND '+d.toString(16)+')OR('+c.toString(16)+' AND NOT('+d.toString(16)+')) = '+f.toString(16))
                    }else if(Round ==3){
                        f = (b ^ c ^ d)
                        //console.log('\tF function is B XOR C XOR D')
                        //console.log('\t'+b.toString(16)+' XOR '+c.toString(16)+' XOR '+d.toString(16)+' = '+f.toString(16)+'\n')
                        operation += logAndMakeStr('\tF function is B XOR C XOR D')
                        operation += logAndMakeStr('\t'+b.toString(16)+' XOR '+c.toString(16)+' XOR '+d.toString(16)+' = '+f.toString(16))
                    }else{
                        f = (c ^ (b | ~d))
                        //console.log('\tF function is C XOR (B OR NOT(D))')
                        //console.log('\t'+c.toString(16)+' XOR ('+b.toString(16)+' OR NOT('+d.toString(16)+')) = '+f.toString(16)+'\n')
                        operation += logAndMakeStr('\tF function is C XOR (B OR NOT(D))')
                        operation += logAndMakeStr('\t'+c.toString(16)+' XOR ('+b.toString(16)+' OR NOT('+d.toString(16)+')) = '+f.toString(16))
                    }
                    

                    //for log
                    let o1,o2,o3;

                    //mod1
                    let mod1 = (a + f)% 0x100000000n
                    o1 = a.toString(16)
                    o2 = f.toString(16)
                    o3 = mod1.toString(16)
                    //console.log('\tMod1:\t\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)
                    operation += logAndMakeStr('\tMod1:\t\t( '+o1+filltab(o1)+'+\t'+o2+' ) % 100000000'+filltab(o2)+'\t=\t'+o3)
                    
                    //mod2
                    let mod2 = (BigInt(_M[datablockIndex][Mindex[s-1]])+mod1)% 0x100000000n
                    o1 = BigInt(_M[datablockIndex][Mindex[s-1]]).toString(16)
                    o2 = mod1.toString(16)
                    o3 = mod2.toString(16)
                    //console.log('\tMod2:[M('+Mindex[s-1]+')]\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)
                    operation += logAndMakeStr('\tMod2:[M('+Mindex[s-1]+')]\t( '+o1+filltab(o1)+'+\t'+o2+' ) % 100000000'+filltab(o2)+'\t=\t'+o3)

                    //mod3
                    let mod3 = (_K[s-1]+mod2)%0x100000000n
                    o1 = _K[s-1].toString(16)
                    o2 = mod2.toString(16)
                    o3 = mod3.toString(16)
                    //console.log('\tMod3:[K('+s+')]\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)
                    operation += logAndMakeStr('\tMod3:[K('+s+')]\t( '+o1+filltab(o1)+'+\t'+o2+' ) % 100000000'+filltab(o2)+'\t=\t'+o3)

                    //Left bit-shift
                    let shift = countOfShiftLeft(s)
                    o1 = mod3.toString(16)
                    mod3 = shiftbit32Circular(mod3,shift)
                    o2 = shift
                    o3 = mod3.toString(16)
                    //console.log('\tSHIFT BIT:\t'+o1+filltab(o1)+'<<\t'+o2+'\t\t=\t'+o3)
                    operation += logAndMakeStr('\tSHIFT BIT:\t'+o1+' << '+o2+' = '+o3)

                    //mod4
                    let mod4 = (b+BigInt(mod3))% 0x100000000n
                    o1 = b.toString(16)
                    o2 = mod3.toString(16)
                    o3 = mod4.toString(16)
                    //console.log('\tMod4:\t\t'+o1+filltab(o1)+'+\t'+o2+filltab(o2)+'=\t'+o3)
                    operation += logAndMakeStr('\tMod4:\t\t( '+o1+filltab(o1)+'+\t'+o2+' ) % 100000000'+filltab(o2)+'\t=\t'+o3)


                    //new a,b,c,d
                    a = d
                    d = c
                    c = b
                    b = mod4
                    // console.log('\t\tA = ',a.toString(16))
                    // console.log('\t\tB = ',b.toString(16))
                    // console.log('\t\tC = ',c.toString(16))
                    // console.log('\t\tD = ',d.toString(16))
                    operation += logAndMakeStr('\t\tA = '+a.toString(16))
                    operation += logAndMakeStr('\t\tB = '+b.toString(16))
                    operation += logAndMakeStr('\t\tC = '+c.toString(16))
                    operation += logAndMakeStr('\t\tD = '+d.toString(16))
                    
                }
                Round++;
                //console.log(Round)
            }
        operation += logAndMakeStr('--------------------------------')
        let o1,o2
        o1 = a.toString(16)
        o2 = A.toString(16)
        A = (a+A)%0x100000000n
        operation += logAndMakeStr('A = ('+o1+' + '+o2+') %100000000 = '+A.toString(16))

        o1 = b.toString(16)
        o2 = B.toString(16)
        B = (b+B)%0x100000000n
        operation += logAndMakeStr('B = ('+o1+' + '+o2+') %100000000 = '+B.toString(16))

        o1 = c.toString(16)
        o2 = C.toString(16)
        C = (c+C)%0x100000000n
        operation += logAndMakeStr('C = ('+o1+' + '+o2+') %100000000 = '+C.toString(16))

        o1 = d.toString(16)
        o2 = D.toString(16)
        D = (d+D)%0x100000000n
        operation += logAndMakeStr('D = ('+o1+' + '+o2+') %100000000 = '+D.toString(16))
        
        operation += logAndMakeStr('--------------------------------')
    }
    let finalResult = A.toString(16)+B.toString(16)+C.toString(16)+D.toString(16)
    return objResult(_K,DataBlockList,_M,operation,finalResult)
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
    sh = [7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21]
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
    if(str.length <= 6){
        return '\t\t'
    }
    return '\t'
}
function logAndMakeStr(str){
    //console.log(str)
    return str+'\n'
}


function objResult(K,datablockList,M,operation,finalResult){
    K = K.map(function(x){return x.toString(16)})
    M =  M.map(function(row){
        return row.map(function(cell){
            return cell.toString(16)
        })
    })
    return {
        'K':K,
        'DATA_BLOCK':datablockList,
        'M':M,
        'operation':operation,
        'RESULT':finalResult
    }
}





