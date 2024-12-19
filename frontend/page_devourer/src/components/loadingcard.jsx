function LoadingCard(){
    return(
        <div className="flex-col items-center justify-center w-72 h-60 sm:w-60 sm:h-60 bg-light rounded-3xl shadow-custom-shadow p-5 animate-pulse space-y-2">
                  <div className="w-full bg-zinc-300 h-5 rounded-full "></div>
                  <div className="w-full bg-zinc-200 h-4 rounded-full" ></div>
                  <div className="w-4/5 bg-dark h-3 "></div>
                  <div className="w-3/4 bg-dark h-3"></div>
                  <div className="w-full bg-dark h-3 "></div>
              </div>
    )
}

export default LoadingCard;