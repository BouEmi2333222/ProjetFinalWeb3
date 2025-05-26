import "../../css/carousel.css";

export default function Carousel()
{
    return(
        <div id="myCarousel" className="carousel slide cs-carousel-div cs-grow-carousel" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="cs-carousel-button active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="cs-carousel-button" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className="cs-carousel-button" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner cs-carousel-inner">
                <div className="carousel-item active cs-item">
                    <img src="/imagesCaroussel/Art_Kamigawa.jpg" className="cs-images" alt="..."></img>
                </div>
                <div className="carousel-item cs-item">
                    <img src="/imagesCaroussel/Art_Tarkir.jpg" className="cs-images" alt="..."></img>
                </div>
                <div className="carousel-item cs-item">
                    <img src="/imagesCaroussel/Art_Phyrexia.jpg" className="cs-images" alt="..."></img>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span aria-hidden="true">
                    <i className="bi bi-caret-left cs-carousel-button"></i>
                </span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span aria-hidden="true">
                    <i className="bi bi-caret-right cs-carousel-button"></i>
                </span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}