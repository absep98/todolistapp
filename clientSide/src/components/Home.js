import TodoList from './TodoList';
import React from 'react'

function Home() {
  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 flex items-center justify-center p-4">
      <TodoList />
    </main>
  )
}

export default Home
