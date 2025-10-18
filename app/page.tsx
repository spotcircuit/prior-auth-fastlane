export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Prior-Auth Fastlane MVP</h1>
        <p className="text-lg text-gray-600 mb-8">
          Clinic-safe prior authorization workflow system
        </p>
        <div className="inline-flex gap-4">
          <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
            Next.js 15
          </span>
          <span className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold">
            TypeScript
          </span>
          <span className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold">
            Tailwind CSS 4.0
          </span>
        </div>
      </div>
    </main>
  )
}
