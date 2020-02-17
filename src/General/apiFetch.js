
export async function addApplicantFetch(formData){
    var url = `${process.env.REACT_APP_API_URL}/application/add`
    const response = await fetch(url,{
        method:"POST",
        body:formData
    })
    return await response
}

export async function getFetch(){
    var url = `${process.env.REACT_APP_API_URL}/application/get_all`
    const response = await fetch(url)
    return await response
}