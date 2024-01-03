import React from 'react';
import './Footer.css';

const Footer = () => {

    let currentYear = new Date().getFullYear();

    return(
        <footer>
            <div className="text-center my-3">
                <h6 className="text-secondary">
                    <span>&copy; {currentYear} </span><span>Alpha </span><span>CRC</span><span>AI power within</span>
                </h6>
            </div>
        </footer>
    );
}

export default Footer;