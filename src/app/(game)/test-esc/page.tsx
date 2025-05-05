"use client"

import React from 'react'

export default function TestEscPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">ESC Menu Test Page</h1>
        <p className="text-xl">Press the ESC key to open the menu.</p>
        <div className="mt-8 p-4 bg-blue-800 rounded-md">
          <p>If pressing ESC doesn&apos;t work, check the browser console for errors.</p>
        </div>
      </div>
    </div>
  )
} 