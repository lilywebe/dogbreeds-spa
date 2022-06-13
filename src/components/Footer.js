/*
Name: Lily Weber
Date: 13-June-2022
File: Footer.js
Description: create the page footer
*/

const Footer = () => {
    const year = new Date().getFullYear();  //determine the current year with JavaScript
    return (
        <footer>
            <div className="container">
                <span>&copy;Dog Breeds Corporation 2022-{year}</span>
            </div>
        </footer>
    );
};

export default Footer;