'use client'

import { useState } from "react"

export default function PublisherInfoPage({ setIsPublisher }: { setIsPublisher: (v: boolean) => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    organization: "",
    idCardImage: null as File | null,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setForm(f => ({ ...f, idCardImage: file }))
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Get current user from localStorage (or your auth context)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  // Update user data
  user.isPublisher = true
  localStorage.setItem('user', JSON.stringify(user))
  setSubmitted(true)
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black flex items-center justify-center">
      <div className="bg-slate-900/90 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Publisher Information</h1>
        {submitted ? (
          <div className="text-green-400 text-center font-semibold">
            Thank you! Your information has been submitted.<br />
            Please wait for one week for your application to be reviewed and accepted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-200 mb-1">Full Name</label>
              <input
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1">Phone Number</label>
              <input
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1">Age</label>
              <input
                type="number"
                min="0"
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1">Address</label>
              <input
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1">Organization (optional)</label>
              <input
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                name="organization"
                value={form.organization}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-slate-200 mb-1">Citizen Identification Card (photo)</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                onChange={handleImageChange}
                required
              />
              {preview && (
                <img src={preview} alt="ID Card Preview" className="mt-2 rounded shadow max-h-40 mx-auto" />
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}