"use client"

import { useState, useEffect } from "react"
import { ListComponent } from "@/components/list-component"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { SearchFilter } from "@/components/search-filter"

// Type definition for the API data
interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function HomePage() {
  // State management for API data
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate network delay for better UX demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await fetch("https://jsonplaceholder.typicode.com/posts")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: Post[] = await response.json()

        // Limit to first 20 posts for better performance
        const limitedData = data.slice(0, 20)
        setPosts(limitedData)
        setFilteredPosts(limitedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredPosts(filtered)
    }
  }, [searchTerm, posts])

  // Custom render function for post items
  const renderPostItem = (post: Post, index: number) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Post #{post.id}
        </span>
        <span className="text-xs text-gray-500">User {post.userId}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.body}</p>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Item {index + 1} of {filteredPosts.length}
        </span>
      </div>
    </div>
  )

  // Retry function for error handling
  const handleRetry = () => {
    window.location.reload()
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Fetching posts from API..." />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage title="Failed to Load Posts" message={error} onRetry={handleRetry} />
      </div>
    )
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Posts Dashboard</h1>
          <p className="text-gray-600 text-lg">Data fetched from JSONPlaceholder API</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            ✅ {posts.length} posts loaded successfully
          </div>
        </header>

        {/* Search Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search posts by title or content..."
        />

        {/* Results Summary */}
        {searchTerm && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredPosts.length} of {posts.length} posts
              {searchTerm && (
                <span className="ml-1">
                  for "<span className="font-medium">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        )}

        {/* Reusable List Component */}
        <ListComponent
          items={filteredPosts}
          renderItem={renderPostItem}
          keyExtractor={(post) => `post-${post.id}`}
          emptyMessage={searchTerm ? `No posts found matching "${searchTerm}"` : "No posts available"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          loadingMessage="Loading posts..."
        />
      </div>
    </div>
  )
}
