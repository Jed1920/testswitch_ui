
export async function addApplicantFetch(formData){
    var url = `${process.env.REACT_APP_API_URL}/application/add`
    console.log(url)
    const response = await fetch(url,{
        method:"POST",
        body:formData
    })
    return await response
}