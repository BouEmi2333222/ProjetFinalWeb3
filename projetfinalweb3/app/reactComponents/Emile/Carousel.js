export default function Carousel()
{
    return(
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="logo.png" className="d-block w-100" height={300} width={2000} alt="..."></img>
                </div>
                <div className="carousel-item">
                    <img src="https://static.wikia.nocookie.net/b0d72e29-f158-42ce-b553-0b6968f86cf6" className="d-block w-100" height={300} width={2000} alt="..."></img>
                </div>
                <div className="carousel-item">
                    <img src="shanks.png" className="d-block w-100" height={300} width={2000} alt="..."></img>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}