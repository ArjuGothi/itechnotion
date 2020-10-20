export const getUsers = ()=>{
    const requestOption = {
        method:"GET",
        headers:{},
    }
    return fetch(`https://jsonplaceholder.typicode.com/users`,requestOption)
}
export const getPosts = ()=>{
    const requestOption = {
        method:"GET",
        headers:{},
    }
    return fetch(`https://jsonplaceholder.typicode.com/posts`,requestOption)
}