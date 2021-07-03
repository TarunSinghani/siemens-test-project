import React from "react";

const Footer=()=>{
    return(
        <div style={{marginTop:120}}>
             <footer className="bg-dark text-white mt-5 p-4 text-center">
                Copyright &copy; {new Date().getFullYear()} Tarun Singhani
            </footer>

        </div>
    )
}

export default Footer;