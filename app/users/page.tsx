"use client"

import { useState, useEffect } from "react"
import { ListComponent } from "@/components/list-component"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { Mail, Phone, Globe, Building } from "lucide-react"

// User interface matching JSONPlaceholder API
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
  address: {
    city: string
    zipcode: string
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("https://jsonplaceholder.typicode.com/users")

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`)
        }

        const data: User[] = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Custom render function for user items
  const renderUserItem = (user: User, index: number) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      {/* User Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-blue-500" />
          <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors">
            {user.email}
          </a>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-green-500" />
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Globe className="w-4 h-4 text-purple-500" />
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-colors"
          >
            {user.website}
          </a>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Building className="w-4 h-4 text-orange-500" />
          <span>{user.company.name}</span>
        </div>
      </div>

      {/* Location & Company Info */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-1">
          📍 {user.address.city}, {user.address.zipcode}
        </p>
        <p className="text-xs text-gray-400 italic">"{user.company.catchPhrase}"</p>
      </div>
    </div>
  )

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Loading user directory..." />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage title="Failed to Load Users" message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Directory</h1>
          <p className="text-gray-600 text-lg">Browse our community members</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            ✅ {users.length} users loaded
          </div>
        </header>

        {/* Reusable List Component for Users */}
        <ListComponent
          items={users}
          renderItem={renderUserItem}
          keyExtractor={(user) => `user-${user.id}`}
          emptyMessage="No users found"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        />
      </div>
    </div>
  )
}
