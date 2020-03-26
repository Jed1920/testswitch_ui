
export async function addApplicantFetch(formData){
    var url = `${process.env.REACT_APP_API_URL}/application/add`
    const response = await fetch(url,{
        method:"POST",
        body:formData
    })
    return await response
}

export async function loginFetch(data){
    var url = `${process.env.REACT_APP_API_URL}/login`
    const response = await fetch(url,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    console.log(await response)
    return await response
}

export async function getFetch(stringUrl){
    var url = `${process.env.REACT_APP_API_URL}${stringUrl}`
    const response = await fetch(url,{
        method:"GET",
        headers: {"token" : document.cookie}
    })
    return await response
}