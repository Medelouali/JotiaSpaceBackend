const access = (token)=>{
    const response={
        payload: {},
        denied: true
    }
    if(!token) return response;
    try{
        const verified=jwt.verify(token, process.env.JWT_KEY);
        response.payload=verified;
        response.denied=false;
    }catch(e){
        //No code here
    }
    return response;
}