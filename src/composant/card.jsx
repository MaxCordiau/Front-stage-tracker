import { Briefcase, ChartColumn, CheckCircle, XCircle } from 'lucide-react'

export default function Card() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { icon: Briefcase, title: "Total Applications", value: 0, color: "from-blue-400 to-blue-600" },
            { icon: ChartColumn, title: "En Attente", value: 0, color: "from-yellow-400 to-yellow-600" },
            { icon: CheckCircle, title: "Accepter", value: 0, color: "from-green-400 to-green-600" },
            { icon: XCircle, title: "Refuser", value: 0, color: "from-red-400 to-red-600" },
        ].map((item, index) => (
            <article key={index} className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out ">
            <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${item.color} mb-4`}>
                <item.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{item.value}</p>
            </article>
        ))}
        </section>
    )
}