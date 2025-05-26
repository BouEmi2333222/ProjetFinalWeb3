import "../css/footer.css"
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Footer()
{
    return (
        <footer className="footer">
            <div className="cs-footer-div d-flex align-items-center flex-column pt-3">
                <p className="text-muted">© 2025 LePDC, Planète des Cartes</p>
                <ul className="d-flex list-unstyled cs-list">
                    <li className="ms-3 cs-grow"><a className="text-muted" href="#"><i className="bi bi-facebook"></i></a></li>
                    <li className="ms-3 cs-grow"><a className="text-muted" href="#"><i className="bi bi-twitter-x"></i></a></li>
                    <li className="ms-3 cs-grow"><a className="text-muted" href="#"><i className="bi bi-youtube"></i></a></li>
                </ul>
            </div>
        </footer>
    )
}