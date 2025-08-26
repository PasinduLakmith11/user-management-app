import React, { useState, useEffect } from 'react'
import { userAPI } from '../services/api'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAllUsers()
      setUsers(response.data)
    } catch (error) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'Male': return '👨'
      case 'Female': return '👩'
      default: return '👤'
    }
  }

  const getSkillColor = (skill) => {
    switch (skill) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-blue-100 text-blue-800'
      case 'Advanced': return 'bg-purple-100 text-purple-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Members</h1>
        <p className="text-lg text-gray-600">Meet our amazing community of {users.length} members</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-indigo-100">{user.email}</p>
                </div>
                <div className="text-3xl">
                  {getGenderIcon(user.gender)}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {user.hobby && (
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <p className="text-sm text-gray-500">Favorite Hobby</p>
                      <p className="font-medium text-gray-900">{user.hobby}</p>
                    </div>
                  </div>
                )}

                {user.skill_level && (
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⭐</span>
                    <div>
                      <p className="text-sm text-gray-500">Skill Level</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getSkillColor(user.skill_level)}`}>
                        {user.skill_level}
                      </span>
                    </div>
                  </div>
                )}

                {user.bio && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">About</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Member since {formatDate(user.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Be the first to register!</p>
        </div>
      )}
    </div>
  )
}

export default UserList