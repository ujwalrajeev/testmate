async function Signin(token) {
    const response = await fetch(process.env.REACT_APP_SIGNIN_API, {
            method: 'POST',
            body: JSON.stringify(token),
            headers: {
                'Content-Type': 'application/json'
            }
    });
    const response_code = response.status;
    (response.json()).then((data) => {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
    });
    if (response_code >= 200 && response_code <= 300){
        return 1;
    }
}

export default Signin;