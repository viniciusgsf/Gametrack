interface GamneCardProps {
        title: string;
        status: string;
        image: string;
    }


function GameCard({ title, status, image }: GamneCardProps) {

    return (
        <div className=" bg-slate-900 rounded-2x1 overflow-hidden hover:scale-[1.020] transition duration-300">
        
            <img src={image} alt={title} className="w-full h-48 object-cover" />
        

        <div className="p-4">
            <h4 className="text-xl font-bold mb-2">{title}</h4>
            <p className="text-gray-400">{status}</p>
        
        </div>
        </div>
    )

 }

 export default GameCard