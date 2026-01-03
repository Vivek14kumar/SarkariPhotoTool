/*export const metadata = {
  title: "Coming Soon | GovForm Tools",
  description: "We are working on something amazing. Stay tuned!"
};*/

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-4">
      
      <div className="max-w-xl w-full text-center bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8">
        
        {/* Logo / Brand */}
        <h1 className="text-3xl font-bold text-white">
          Sarkari Photo Tool
        </h1>

        {/* Divider */}
        <div className="h-1 w-20 bg-white/70 mx-auto my-4 rounded-full"></div>

        {/* Main Text  */}
        <h2 className="text-4xl font-extrabold text-white mt-4">
         Bulk Image Resizer
        </h2>
        <h3 className="text-4xl font-extrabold text-white mt-4">
          Coming Soon 🚀
        </h3>

        <p className="mt-4 text-white/90 text-lg">
          We’re building something powerful to make government form uploads
          easier, faster, and rejection-free.
        </p>

        {/* Status Badge */}
        <div className="mt-6 inline-block px-4 py-2 bg-white/30 text-white rounded-full text-sm font-medium">
          🔧 Under Development
        </div>

        {/* Optional Email CTA (can remove if not needed) */}
        <div className="mt-8">
          <p className="text-white/80 mb-2">
            Get notified when we launch
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-800"
            />
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition">
              Notify
            </button>
          </div>
        </div>

        {/* Footer 
        <p className="mt-8 text-xs text-white/70">
          © {new Date().getFullYear()} GovForm Tools. All rights reserved.
        </p>*/}
      </div>
    </div>
  );
}
