import TodoList from './TodoList';
import React from 'react'

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <TodoList />
    </main>
  )
}

export default Home
