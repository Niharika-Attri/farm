function Card(props){
    return(
        <div className="flex justify-center w-60 h-60 bg-light rounded-3xl shadow-custom-shadow">
            <div className="h-28 w-56 mt-3 rounded-2xl overflow-hidden">
            <img src={props.url} className="w-full h-full object-cover "/>
            </div>
        </div>
    )
}

export default Card