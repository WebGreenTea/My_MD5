// A = 0x01234567
// B = 0x89abcdefn
// C = 0xfedcba98n
// D = 0x76543210



// console.log('B is',B)
// console.log(typeof(B))
// console.log('C is',C)
// f = Number(B & C)
// console.log(f)

 

// console.log(((Math.abs(Math.sin(0+1)))*Math.pow(2,32)))


// function countOfShiftLeft(r){
//     sh = [7,12,17,22,5,9,14,20,4,11,16,13,6,10,15,21]
//     start = 1
//     l = start
//     index = 0
//     if(r>64){
//         return -1;
//     }
//     while(l != r && l<64){
//         if(l%16 == 0){
//             start=l+1
//             l=start
//             index++;
//         }else{
//             l = l+4
//             if(l-start > 12){
//                 index++;
//                 start++;
//                 l=start
//             }
//         }
//         console.log('start',start,':l',l)
        

//     }
//     return sh[index]
// }



// console.log(countOfShiftLeft(100))



// function shiftbit32Circular(value,sh){
//     value = value.toString(2)
//     while(value.length < 32){
//         value = '0'+value
//     }

//     console.log(value)

//     let re = value.slice(sh,value.length) + value.slice(0,sh)
//     return parseInt(re,2);
// }


// console.log(shiftbit32Circular(735250928,7))

function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

b = 0xfa9a7e14
c = 0x38e92c1d
d = 0x1dd9e3e

f = (c ^ (b | ~d))


test = 4294967296
x = -19088744
y = 0x01234567
//console.log(typeof(test))
console.log(safeAdd(x, y).toString(16))