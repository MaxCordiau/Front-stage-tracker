import Header from '../composant/header.jsx'
import Card from '../composant/card.jsx'
import { Link } from 'react-router-dom'
import Tableau from '../composant/tableau.jsx'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
            <Card />
            <section className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Applications</h2>
                <div className="space-x-4">
                <Link to="#" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Filtres</Link>
                <Link to="#" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Calendrier</Link>
                <Link to="#" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition duration-300 ease-in-out transform hover:scale-105">+ Ajouter une application</Link>
                </div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-6">
                <Tableau />
            </div>
            </section>
        </main>
        </div>
    )
}