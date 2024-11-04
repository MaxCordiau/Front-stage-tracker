import { Briefcase } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <div className="mr-4 bg-gradient-to-br from-blue-400 to-purple-600 p-2 rounded-full">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Stage Tracker
        </h1>
      </div>
    </header>
  )
}