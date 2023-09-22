'use strict';

const template = document.createElement( 'template' );

template.innerHTML = `
    <style>
        :host {                             
            display: block;  
            width: 100%;      
            contain: content;
        }

        :host([hidden]) {
            display: none;
        }

        #root {
            position: relative;
            display: block;
            width: 100%;
            height: 0;
            padding-bottom: calc(100% / (16 / 9));
            cursor: pointer;
        }
    
        #posterimage, 
        iframe {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;           
        }        

        #posterimage {
            object-fit: cover;
            opacity: 1;
            transition: 0.3s;
        }

        iframe {
            border: 0;
            z-index: 1;
        }

        #playbutton {
            display: none;
        }

        /* YouTube */
        .youtube > #playbutton {
            position: absolute;
            display: block;
            width: 72px;
            height: 48px;       
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);            
            background: center/72px 48px no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 48'%3E%3Cpath fill='%23f00' fill-opacity='.9' d='M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6c-3 .7-4.6 3.2-5.4 6.1a89.6 89.6 0 000 32.5c.8 3 2.5 5.5 5.4 6.3C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c3-.7 4.6-3.2 5.4-6.1C68 35 68 24 68 24s0-11-1.5-16.3z'/%3E%3Cpath fill='%23fff' d='M45 24L27 14v20'/%3E%3C/svg%3E");
            border: 0;
            filter: grayscale(1);
            transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);        
            cursor: pointer;
            z-index: 1;
        }       
        
        .youtube:hover > #playbutton,
        .youtube > #playbutton:focus {
            filter: none;
        }

        /* Vimeo */
        .vimeo > #playbutton {
            position: absolute;
            display: flex;
            width: 72px;
            height: 48px;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background: rgba(23, 35, 34, .75);
            border: 0;
            border-radius: 8px;
            opacity: 0.8;           
            transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);  
            align-items: center;
            justify-content: center;
            cursor: pointer;            
            z-index: 1;
        }  
        
        .vimeo > #playbutton:after {
            content: "";
            border-color: transparent transparent transparent #fff;
            border-style: solid;
            border-width: 10px 0 10px 20px;            
        }      
        
        .vimeo:hover > #playbutton,
        .vimeo > #playbutton:focus {
            background: rgb(98, 175, 237);
            opacity: 1;
        }

        /* Dailymotion */
        .dailymotion > #playbutton {
            position: absolute;
            display: block;
            width: 80px;
            height: 80px;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.56047 5.09337C8.34001 4.9668 8.07015 4.96875 7.85254 5.10019C7.63398 5.23162 7.5 5.47113 7.5 5.73011L7.5 18.2698C7.5 18.5298 7.63398 18.7693 7.85254 18.9007C7.96372 18.9669 8.0882 19 8.21268 19C8.33241 19 8.45309 18.9688 8.56047 18.9075L18.1351 12.6377C18.3603 12.5082 18.5 12.2648 18.5 12C18.5 11.7361 18.3603 11.4917 18.1351 11.3632L8.56047 5.09337Z' fill='%23fff'%3E%3C/path%3E%3C/svg%3E");
            background-color: rgba(13, 13, 13, 0.6);
            background-size: 64px;
            background-position: center;
            border: 0;
            border-radius: 40px;
            opacity: 1;           
            transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);  
            cursor: pointer;            
            z-index: 1;
        }     
        
        .dailymotion:hover > #playbutton,
        .dailymotion > #playbutton:focus {
            opacity: 0.8;
        }

        /* Cookie consent */
        #cookieconsent-modal {           
            position: absolute; 
            display: none;          
            width: 90%;
            max-width: 640px;
            padding: 15px;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background: rgba(0, 0, 0, 0.7);
            border-radius: 3px;   
            color: #fff;
            text-align: center;        
            box-sizing: border-box;
            z-index: 1;
        }  
        
        @media only screen and (max-width: 320px) {
            #cookieconsent-modal {
                width: 100%;
                height: 100%;
            }
        }

        #cookieconsent-button {
            display: inline-block;
            margin-top: 10px;
            padding: 7px 15px;
            background: #e70808;
            border: 0;
            border-radius: 3px;    
            color: #fff;     
            line-height: 1; 
            cursor: pointer;  
        }

        #cookieconsent-button:hover {
            opacity: 0.8;
        }

        #root.cookieconsent {
            cursor: unset;
        }

        #root.cookieconsent > #playbutton {
            display: none;
        }

        #root.cookieconsent > #cookieconsent-modal {
            display: block;
        }

        /* Post-click styles */
        #root.initialized {
            cursor: unset;
        }

        #root.initialized > #posterimage,
        #root.initialized > #playbutton {
            opacity: 0;
            pointer-events: none;
        }
    </style>
    <div id="root">
        <img id="posterimage" src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="" referrerpolicy="origin" />
        <button type="button" id="playbutton" aria-label="Play Video"></button>
        <div id="cookieconsent-modal">
            <slot name="cookieconsent-message"></slot>
            <button type="button" id="cookieconsent-button">
                <slot name="cookieconsent-button-label">I Agree</slot>
            </button>
        </div>
    </div>
`;

class AIOVGBaseElement extends HTMLElement {

    /**
     * Element created.
     */
    constructor() {
        super();        
        
        // Attach Shadow DOM to the component
        const shadowDom = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild( template.content.cloneNode( true ) );        

        // Set references to the DOM elements from the component's template
        this.$root = shadowDom.querySelector( '#root' );
        this.$posterImage = shadowDom.querySelector( '#posterimage' );
        this.$playButton = shadowDom.querySelector( '#playbutton' );    
        this.$cookieConsentButton = shadowDom.querySelector( '#cookieconsent-button' );
        
        // Set references to the private properties used by the component
        this._isRendered = false;
        this._isCookieConsentLoaded = false;
        this._isPosterImageLoaded = false;
        this._isIframeLoaded = false;             
        this._forceIframeElement = navigator.vendor.includes( 'Apple' ) || navigator.userAgent.includes( 'Mobi' ); 
        this._intersectionObserver = null;
        this._isInViewport = false;
    }

    /**
     * Browser calls this method when the element is added to the document.
     * (can be called many times if an element is repeatedly added/removed)
     */
    connectedCallback() { 
        if ( ! this.src ) return;

        if ( ! this.lazyLoading ) {
            this._forceIframeElement = true;
        }
        
        if ( ! this.poster ) {
            this._forceIframeElement = true;
        }

        if ( ! this._forceIframeElement ) {
            const url = new URL( this.src );
            const query = new URLSearchParams( url.search );            
            const autoplayRequested = query.has( 'autoplay' ) && ( query.get( 'autoplay' ) == 1 || query.get( 'autoplay' ) == true );    
            
            if ( autoplayRequested ) this._forceIframeElement = true;
        }        
       
        this._render();

        this.addEventListener( 'pointerover', () => this._warmConnections(), { once: true, } );
        this.addEventListener( 'click', () => this._addIframe( true ) );
    }

    /**
     * Browser calls this method when the element is removed from the document.
     * (can be called many times if an element is repeatedly added/removed)
     */
    disconnectedCallback() {
        this.removeEventListener( 'pointerover', () => this._warmConnections(), { once: true, } );
        this.removeEventListener( 'click', () => this._addIframe( true ) );
    }

    /**
     * Array of attribute names to monitor for changes.
     */
    static get observedAttributes() {
        return [ 'title', 'ratio', 'cookieconsent' ];
    }   
    
    /**
     * Called when one of the observed attributes listed above is modified.
     */
    attributeChangedCallback( name, oldValue, newValue ) {
        if ( oldValue === newValue ) return;

        switch ( name ) {
            case 'title':
                // Set attributes for accessibility
                if ( newValue ) {
                    this.$posterImage.setAttribute( 'alt', newValue );  
                } else {
                    this.$posterImage.setAttribute( 'alt', '' );
                }
                break;

            case 'ratio':      
                if ( newValue ) {               
                    this.$root.style.paddingBottom = `${parseFloat(newValue)}%`; 
                }
                break;

            case 'cookieconsent':                     
                if ( ! this._isRendered ) {
                    this._removeClass( 'cookieconsent' );                    
                    this._render();
                }
                break;
        }
    }

    /**
     * Define getters and setters for attributes.
     */

    get title() {
        return this.getAttribute( 'title' ) || '';
    }

    get src() {
        const value = this.getAttribute( 'src' ) || '';
        return AIOVGBaseElement.isValidUrl( value ) ? value : '';
    }

    get poster() {
        const value = this.getAttribute( 'poster' ) || '';
        return AIOVGBaseElement.isValidUrl( value ) ? value : '';
    }

    get postId() {
        return parseInt( this.getAttribute( 'post_id' ) || 0 );
    }  
    
    get postType() {
        return this.getAttribute( 'post_type' ) || '';
    } 

    get ajaxUrl() {
        const value = this.getAttribute( 'ajax_url' ) || '';
        return AIOVGBaseElement.isValidUrl( value ) ? value : '';
    }

    get ajaxNonce() {
        return this.getAttribute( 'ajax_nonce' ) || '';
    }

    get lazyLoading() {
        return this.hasAttribute( 'lazyloading' );
    }

    get cookieConsent() {
        return this.hasAttribute( 'cookieconsent' );
    }

    set cookieConsent( value ) {
        const isEnabled = Boolean( value );

        if ( isEnabled ) {
            this.setAttribute( 'cookieconsent', '' );
        } else {
            this.removeAttribute( 'cookieconsent' );
        }
    } 

    /**
     * Define private methods.
     */

    _render() {    
        if ( this._isRendered ) true;          
        
        if ( this.lazyLoading && ! this._isInViewport ) {
            this._initIntersectionObserver();
            return;
        }
        
        if ( this.cookieConsent ) {      
            this._addCookieConsent();           
            return;
        }  

        this._isRendered = true; 

        if ( this._forceIframeElement ) {
            this._warmConnections();
            this._addIframe();
        } else {                    
            this._addPosterImage();    
        }
    }

    _addCookieConsent() {
        if ( this._isCookieConsentLoaded ) return; 
        this._isCookieConsentLoaded = true;

        this._addPosterImage();           
        this._addClass( 'cookieconsent' );

        this.$cookieConsentButton.addEventListener( 'click', () => this._onCookieConsent() );
    }

    _onCookieConsent() {   
        this._isRendered = true;
            
        this._removeClass( 'cookieconsent' );
        this.cookieConsent = false;        

        this._warmConnections();
        this._addIframe( true );

        this._setCookie();
    }

    _addPosterImage() {
        if ( this._isPosterImageLoaded ) return; 
        this._isPosterImageLoaded = true;

        if ( this.poster ) {
            this.$posterImage.src = this.poster; 
        }        
    }

    _addIframe( autoplayRequested = false ) {
        if ( this._isIframeLoaded ) return;  
        this._isIframeLoaded = true;  

        const iframeEl = document.createElement( 'iframe' );
        
        iframeEl.width = 560;
        iframeEl.height = 315;
       
        iframeEl.title = this.title;
        
        iframeEl.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframeEl.allowFullscreen = true;

        if ( autoplayRequested ) {
            const url = new URL( this.src );

            let searchParams = url.searchParams;
            searchParams.set( 'autoplay', 1 );

            url.search = searchParams.toString();

            iframeEl.src = url.toString();
        } else {
            iframeEl.src = this.src;
        }

        this.$root.append( iframeEl );

        this._addClass( 'initialized' );
        this._updateViewsCount();        

        this.dispatchEvent(new CustomEvent('AIOVGIframeLoaded', {
            detail: 'iframe.loaded',
            bubbles: true,
            cancelable: true,
        }));
    }

    _initIntersectionObserver() {
        if ( this._intersectionObserver ) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        this._intersectionObserver = new IntersectionObserver(( entries, observer ) => {
            entries.forEach(entry => {
                if ( entry.isIntersecting ) {
                    this._isInViewport = true;
                    this._render();

                    if ( this._isRendered ) observer.unobserve( this );
                } else {
                    this._isInViewport = false;
                }
            });
        }, options);

        this._intersectionObserver.observe( this );
    } 

    _hasClass( className ) {
        return this.$root.classList.contains( className );
    }
    
    _addClass( className ) {
        this.$root.classList.add( className );
    }

    _removeClass( className ) {
        this.$root.classList.remove( className );
    }

    /**
     * Define private async methods.
     */

    async _updateViewsCount() {
        if ( this.postType == 'aiovg_videos' && this.ajaxUrl ) {
            let formData = new FormData();
            formData.append( 'action', 'aiovg_update_views_count' );
            formData.append( 'post_id', this.postId );
            formData.append( 'security', this.ajaxNonce );

            fetch( this.ajaxUrl, { method: 'POST', body: formData } );
        }
    }
    
    async _setCookie() {
        try {
            if ( this.ajaxUrl ) {
                let formData = new FormData();
                formData.append( 'action', 'aiovg_set_cookie' );
                formData.append( 'security', this.ajaxNonce );

                fetch( this.ajaxUrl, { method: 'POST', body: formData } );
            }
           
            // Announce to our friends  
            const vidstack = document.querySelectorAll( '.aiovg-player-element[cookieconsent]' );
            for ( let i = 0; i < vidstack.length; i++ ) {
                vidstack[ i ].removeAttribute( 'cookieconsent' );
            }

            const videojs = document.querySelectorAll( '.aiovg-player-standard' );
            const event = new CustomEvent( 'cookieConsent' );
            for ( let i = 0; i < videojs.length; i++ ) {
                videojs[ i ].dispatchEvent( event );
            }     
        } catch ( error ) {
            // console.log( error );
        }
    }

    /**
     * Define public methods.
     */

    _warmConnections() {
        // Always overridden by the child classes
    }

    /**
     * Define public static methods.
     */

    static isValidUrl( url ) {
        if ( url === '' ) return false;

        try {
            new URL( url );
            return true;
        } catch ( error ) {
            return false;
        }
    }

    static addPrefetch( kind, url ) {
        const linkElem = document.createElement( 'link' );
        linkElem.rel = kind;
        linkElem.href = url;
        linkElem.crossOrigin = 'true';

        document.head.append( linkElem );
    }    

}

export class AIOVGYouTubeElement extends AIOVGBaseElement {

    constructor() {
        super();
        this._addClass( 'youtube' );
    }

    _warmConnections() {
        if ( window.AIOVGYouTubeIsPreconnected ) return;

        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://i.ytimg.com' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://s.ytimg.com' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://yt3.ggpht.com' );

        if ( this.src.indexOf( 'www.youtube-nocookie.com' ) > -1 ) {
            AIOVGBaseElement.addPrefetch( 'preconnect', 'https://www.youtube-nocookie.com' );
        } else {
            AIOVGBaseElement.addPrefetch( 'preconnect', 'https://www.youtube.com' );
        }

        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://www.google.com' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://googleads.g.doubleclick.net' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://static.doubleclick.net' );

        window.AIOVGYouTubeIsPreconnected = true;
    }

}

export class AIOVGVimeoElement extends AIOVGBaseElement {

    constructor() {
        super();
        this._addClass( 'vimeo' );
    }

    _warmConnections() {
        if ( window.AIOVGVimeoIsPreconnected ) return;

        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://i.vimeocdn.com' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://player.vimeo.com' );

        window.AIOVGVimeoIsPreconnected = true;
    }

}

export class AIOVGDailymotionElement extends AIOVGBaseElement {

    constructor() {
        super();
        this._addClass( 'dailymotion' );
    }

    _warmConnections() {
        if ( window.AIOVGDailymotionIsPreconnected ) return;

        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://s1.dmcdn.net' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://s2.dmcdn.net' );
        AIOVGBaseElement.addPrefetch( 'preconnect', 'https://www.dailymotion.com' );

        window.AIOVGDailymotionIsPreconnected = true;
    }

}

export class AIOVGIframeElement extends AIOVGBaseElement {

    constructor() {
        super();
        this._forceIframeElement = true;
    }

}

// Register custom element
window.AIOVGYouTubeIsPreconnected = false;
customElements.define( 'aiovg-youtube', AIOVGYouTubeElement );

window.AIOVGVimeoIsPreconnected = false;
customElements.define( 'aiovg-vimeo', AIOVGVimeoElement );

window.AIOVGDailymotionIsPreconnected = false;
customElements.define( 'aiovg-dailymotion', AIOVGDailymotionElement );

customElements.define( 'aiovg-embed', AIOVGIframeElement );