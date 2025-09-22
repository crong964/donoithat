import { iCardHome } from "./interface";

export default function CardHome(p: iCardHome) {
    return (
        <div className="col-span-1 h-40 p-2">
            <div className="bg-a rounded-2xl flex flex-col justify-between h-full p-4">
                <div className="mb-3.75">
                    <h1 className="font-bold">
                        {p.title}
                    </h1>
                    <h2 className='text-sm font-light'>
                        {p.des}
                    </h2>
                </div>
                <div>
                    <p className="font-bold text-2xl">
                        {p.count}
                    </p>
                </div>
            </div>
        </div>

    )
}