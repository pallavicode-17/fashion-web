export default function Footer()
{
	return (

<footer className="footer">
      <div className="footer-top-row">
        <div className="footer-logo-block">
          <div className="footer-logo-title">
            <img src="/img/Store.png"/>
          </div>
          <div className="footer-description">
            Vestibulum sagittis, nisl nec pellentesque suscipit, arcu nisi maximus neque, vitae finibus erat odio eu
            lacus. Curabitur malesuada erat eros, quis dignissim dui accumsan id. Cras non imperdiet metus. Sed nec
            turpis nec.
          </div>
        </div>
       
        <div className="footer-newsletter-block">
          <div className="footer-newsletter-title">SIGN UP FOR OUR NEWSLETTER !</div>
          <form className="footer-newsletter-form">
            <input type="email" className="footer-newsletter-input" placeholder="hello@psdfreebies.com" />
            <button type="submit" className="footer-newsletter-btn">Submit</button>
          </form>
        </div>

      </div>
      <div className="footer-bottom-row">
        <div className="footer-col">
          <div className="footer-col-title">INFORMATION</div>
          <ul>
            <li>&#9654; Careers</li>
            <li>&#9654; Investor Relations</li>
            <li>&#9654; Press Releases</li>
            <li>&#9654; Shop with Points</li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">CUSTOMER CARE</div>
          <ul>
            <li>&#9654; Returns</li>
            <li>&#9654; Shipping Info</li>
            <li>&#9654; Gift Cards</li>
            <li>&#9654; Size Guide</li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">STORE INFORMATION</div>
          <ul>
            <li><i className="fa fa-map-marker"></i> address: Lorem ipsum dolor sit amet, Onsectetuer adipiscing elit.</li>
            <li><i className="fa fa-envelope"></i> email: demo@posthemes.com</li>
            <li><i className="fa fa-phone"></i> phone: 0987.654.321</li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; 2015 Psdfreebies. All Rights Reserved
      </div>
    </footer>

	);
	
}