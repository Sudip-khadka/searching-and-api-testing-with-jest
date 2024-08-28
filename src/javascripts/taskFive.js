// You are given an integer array nums and you have to return a new counts array where counts[i] is the number of smaller elements to the right of nums[i].

//initial institution Time Complexity O(n^2) 
//iterate through the array using lenear approach and check if all elements after its index is less than the current element 
//store the number of small elements in count variable and for every small variable found increment the count variable 
// push count for each iteration in array and reset it to zero 
//iterate the array till last element is visited

/** */
//instead of researching the remainaing elements in array one by one using soring with mid-point algorithm  

const countSmaller=(nums)=> {
    
    const result = new Array(nums.length).fill(0);//stores the result array
    
    //recursive function to divide the array  
    function mergeSort(start, end) {
        if (start >= end) return;
        
        const mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);  // Sort the left half of rray
        mergeSort(mid + 1, end); // Sort the right half of array
        
        merge(start, mid, end); // merge both halfs after sorting
    }
    
    function merge(start, mid, end) {
        let temp = [];//temporary array to store merged elements
        let count = 0;//count of smaller elements 
        let left = start, right = mid + 1;
        
        // Count smaller elements and count inversions
        while (left <= mid && right <= end) {
            if (nums[left] > nums[right]) { // If nums[left] > nums[right], then all elements from nums[left] to nums[mid] are greater than nums[right]
                count++;
                temp.push(nums[right++]);
            } else { // nums[left] <= nums[right], no inversions for nums[left]
                result[left] += count;
                temp.push(nums[left++]);
            }
        }
        
        // Copy remaining elements from the left half
        while (left <= mid) {
            result[left++] += count;
        }
        while (right <= end) {//add elements from right Half
            temp.push(nums[right++]);
        }
        
        // Copy sorted elements back to nums zrray
        for (let i = start; i <= end; i++) {
            nums[i] = temp[i - start];
        }
    }
    
    mergeSort(0, nums.length - 1);//merge sort the array from starting to last index
    return result;
}

const nums = [5, 2, 6, 1,1];
console.log(countSmaller(nums)); 
