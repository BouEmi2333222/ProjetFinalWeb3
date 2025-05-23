export default function Footer()
{
    return (
        <footer className="footer">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-4 my-4 border-top">
                <p className="text-muted">© 2025 LePDC, Planète des Cartes</p>
                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
                </ul>
            </div>
        </footer>
    )
}