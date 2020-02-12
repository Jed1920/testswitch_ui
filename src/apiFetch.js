
export async function addApplicantFetch(formData){
    var url = "http://localhost:8080/application/add"
    const response = await fetch(url,{
        method:"POST",
        body:formData
    })
    return await response
}