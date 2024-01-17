class CustomNav extends HTMLElement {

    shadowRoot;

    constructor() {
        super(); // always call super() first in the constructor.

        // shadowRoot element
        this.shadowRoot = this.attachShadow({mode: 'open'})
        
        // custom div
        const div = document.createElement('div');
        div.setAttribute('class', 'topnav');
        div.innerHTML +=
            `
            <div class="topnav-left">
                <a href="../homepage/index.html">Home</a>
                <a href="../profielpage/index.html">Profiel</a>
                <a href="../contactpage/index.html">Contact</a>
            </div>
            <div class="topnav-right">
                <div class="dropdown">
                    <button class="dropbtn">Account</button>
                    <div class="dropdown-content">
                        <a href="../accountpage/index.html">Settings</a>
                        <a href="../accountpage/index.html">Longer Test</a>
                    </div>
                </div>
            </div>`;

        this.shadowRoot.appendChild(div);
        this.attachStyling();
    }

    // class CustomTitle
    attachStyling(){
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "../shared/stylesheets/navstyle.css");
        this.shadowRoot.appendChild(linkElem);
    }

}

customElements.define('custom-nav', CustomNav);