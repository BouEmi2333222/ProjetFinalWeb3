export default function Card(carte) {
    return (
        <a href="#" className="text-decoration-none d-flex justify-content-center">
            <div className="card flex flex-row" style={{ width: "20rem" }}>
                <img src="https://th.bing.com/th/id/R.82888ecdc2a2c3efb35de51fdffe8f34?rik=4nnfXzANK8xHiA&pid=ImgRaw&r=0" className="card-img-top col" height={150} alt="..." />
                <div className="card-body col">
                    <h5 className="card-title">Blacker Lotus</h5>
                    <p className="card-text">My balls itch</p>
                </div>
            </div>
        </a>
    )
}