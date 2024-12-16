function Card(props) {
    return (
        <div className="flex-col justify-center w-60 h-60 bg-light rounded-3xl shadow-custom-shadow pt-5 p-4">
            <h4 className="font-bold text-xl">{props.title}</h4>
            <h5 className="text-sm text-gray-600">{props.author}</h5>
            <p className="text-xs text-gray-500 line-clamp-3">{props.description}</p>
            <ul className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(props.genre) && props.genre.length > 0 ? (
                    props.genre.map((genre, index) => (
                    <li key={index} className="bg-purple text-white text-xs rounded-full px-3 py-1">
                        {genre}
                    </li>
                    ))
                ) : (
                    <li>No genres available</li>
                )}
            </ul>

            <div className="mt-2 text-xs text-gray-600">
                <p>Total Copies: {props.total_copies}</p>
                <p>Available Copies: {props.available_copies}</p>
            </div>
        </div>
    );
}

export default Card;