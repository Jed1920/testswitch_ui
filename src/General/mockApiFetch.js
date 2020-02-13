
export function mockFailedFetch(){
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.reject()
    );
}

export function mockSuccessfulFetch(fakeResponse){
jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
        })
    );
}