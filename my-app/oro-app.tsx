"use client"

import { X, MoreVertical, Globe } from "lucide-react"

export default function TuteApp() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <button className="p-2">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500">
            <Globe className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-lg">TUTE</span>
        </div>
        <button className="p-2">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-blue-300 to-blue-500 flex items-center justify-center shadow-md">
            <Globe className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-gray-600">Claim</span>
          <h1 className="text-4xl font-bold text-gray-800">TUTE</h1>
        </div>

        <p className="text-gray-600">Connect wallet to claim</p>

        <button className="px-8 py-3 bg-purple-500 text-white font-medium rounded-lg shadow-sm hover:bg-purple-600 transition-colors">
          Connect Wallet
        </button>
      </div>
    </div>
  )
}

