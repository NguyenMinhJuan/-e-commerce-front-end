import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export function AccessDenied(){
    return (<>
        <div className="vh-100 bg-black">
        <h5 className="text-center text-danger pt-5">Access Denied!</h5>
            <h6 className="text-center">You don't have permission on this site!</h6>
        </div>
    </>)
}