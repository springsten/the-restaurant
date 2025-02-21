import "./../styles/Contact.scss";
const Contact = () => {
  return (
    <div className="container">
      <div id="contactblock">
        <div className="contactheadline">
          <h4>Kontakt</h4>
        </div>
        <div className="contactinformationlist">
          <ul className="information_list">
            <li className="information_item">
              <span className="information_list_label">Telefon</span>
              <span className="information_list_value">
                <a href="tel:+1234567890">+1234567890</a>
              </span>
            </li>
            <li className="information_item">
              <span className="information_list_label">Email</span>
              <span className="information_list_value">
                <a href="mailto:example@example.com">example@example.com</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div id="integritblock">
        <div className="integritetpolicy">
          <p>
            <a href="">Integritetpolicy</a>
          </p>
        </div>
      </div>
      <div id="solicalblock">
        <div className="social">
          <div className="socialheadline">
            <h4>Följ oss</h4>
          </div>
        </div>
        <div id="socialicons">
          <div className="social_icons">
            <a href="" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
      <div id="openinghoursblock">
        <div className="openingandclose">
          <div className="openingheadline">
            <h4>Öppettider</h4>
          </div>
          <div id="openinghours">
            <ol className="info_list">
              <li className="info_item">
                <span className="info_item_label">Måndag</span>
                <span className="info_item_value">15:00 - 23:00</span>
              </li>
              <li className="info_item">
                <span className="info_item_label">Tisdag</span>
                <span className="info_item_value">15:00 - 23:00</span>
              </li>
              <li className="info_item">
                <span className="info_item_label">Onsdag</span>
                <span className="info_item_value">15:00 - 23:00</span>
              </li>
              <li className="info_item">
                <span className="info_item_label">Torsdag</span>
                <span className="info_item_value">15:00 - 23:00</span>
              </li>
              <li className="info_item">
                <span className="info_item_label">Fredag</span>
                <span className="info_item_value">15:00 - 23:00</span>
              </li>
              <li className="info_item">
                <span className="info_item_label">Lördag</span>
                <span className="info_item_value">16:00 - 00:00</span>
              </li>
              <li className="info_item">
                <span className="info_item_label">Söndag</span>
                <span className="info_item_value">16:00 - 00:00</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
