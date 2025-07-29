"use client"

import { useState, useEffect } from "react"
import { ListComponent } from "@/components/list-component"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("https://jsonplaceholder.typicode.com/posts")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: Post[] = await response.json()
        setPosts(data.slice(0, 10)) // Limit to first 10 posts for better UX
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const renderPostItem = (post: Post) => (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-3">{post.body}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Post ID: {post.id}</span>
        <span>User ID: {post.userId}</span>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
          <p className="text-gray-600">Fetched from JSONPlaceholder API</p>
        </header>

        <ListComponent
          items={posts}
          renderItem={renderPostItem}
          keyExtractor={(post) => post.id.toString()}
          emptyMessage="No posts available"
          className="space-y-4"
        />
      </div>
    </div>
  )
}
