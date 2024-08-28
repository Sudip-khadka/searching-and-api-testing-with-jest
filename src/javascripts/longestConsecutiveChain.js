// Task 3:  Write a function that takes an array of positive integers and returns the length of the longest chain of consecutive numbers. A chain is defined as a sequence of numbers in the array where each number is exactly one more than the previous number in the sequence, and the sequence can be in any order in the array. Also explain the time complexity and space complexity.


//approach as explained in meeting if order cant be rearranged
//store longest chain found and current chain found
//iterate through the array and check if next element is consecutive and increasing by 1 or not 
//if the next element is valid for longest consecutive chain increment current chain 
//else
//compare both of them and if chain breakes, store the longest one among them current and stored longest to be new longest chain
const longestConsecutiveChain=(arr)=> {
    //if array doesnt have any element then we have 0 chained numbers
    if (arr.length === 0) return 0;

    let longestChain = 1;
    let currentChain = 1;

    for (let i = 1; i < arr.length; i++) {//time conplexity Olog(n) //space complexity
        if (arr[i] === arr[i - 1] + 1) {
            currentChain += 1;
        } else if (arr[i] !== arr[i - 1]) {
            longestChain = Math.max(longestChain, currentChain);
            currentChain = 1;
        }
    }

    //final check to see if last current chain is greater
    longestChain = Math.max(longestChain, currentChain);//time complexity  //space complexity

    return longestChain;
}
const array = [1, 2, 3, 2,4, 5, 6,7, 4];
console.log(longestConsecutiveChain(array));

    /*
    Time Complexity :- O(n) as the function only iteartes through the array linearly
    Space Complexity :- O(1) as it uses constant space regardless of size
    */

// but the question mentions that the sequence can be in any order in the array so  
//if array can be sorted and rearranged in any order then we can create longest chain by using sort with set 

const longestConsecutiveChain2=(arr2)=> {
    if (arr2.length === 0) return 0;

    // Create a hash set from the array
    const numSet = new Set(arr2);
    let longestChain2 = 0;

    for (let num of numSet) {
        // Only start counting if `num - 1` is not in the set (start of a new chain)
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentChain2 = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentChain2 += 1;
            }

            longestChain2 = Math.max(longestChain2, currentChain2);
        }
    }

    return longestChain2;
}
const array2 = [1, 2, 3, 2, 4, 5, 6, 7, 4];
console.log(longestConsecutiveChain2(array2));

    /*
    Time Complexity :- O(n) Even though it uses set to identify unique data and useas linear approach for itration over array .
    Space Complexity :- O(n) The function uses a set to store unique numbers, which requires space proportional to the number of unique elements in the input array
    */