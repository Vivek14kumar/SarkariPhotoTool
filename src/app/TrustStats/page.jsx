import {
  ShieldCheck,
  CheckCircle,
  Users,
  Lock,
} from "lucide-react";

export default function TrustStats() {
  return (
    <section className="m-2 rounded-lg relative py-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_60%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          Trusted by Thousands of Applicants
        </h2>
        <p className="text-center text-white/80 max-w-2xl mx-auto mb-12">
          Secure, accurate and completely free tools for government exam photo
          & signature preparation.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <ShieldCheck className="w-10 h-10 mx-auto text-white mb-3 group-hover:scale-110 transition" />
            <p className="text-4xl font-extrabold">100%</p>
            <p className="text-sm opacity-90 mt-1">Free Tools</p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <CheckCircle className="w-10 h-10 mx-auto text-white mb-3 group-hover:scale-110 transition" />
            <p className="text-4xl font-extrabold">50+</p>
            <p className="text-sm opacity-90 mt-1">Exam Guidelines</p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <Users className="w-10 h-10 mx-auto text-white mb-3 group-hover:scale-110 transition" />
            <p className="text-4xl font-extrabold">10K+</p>
            <p className="text-sm opacity-90 mt-1">Users Helped</p>
          </div>

          {/* Card 4 */}
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <Lock className="w-10 h-10 mx-auto text-white mb-3 group-hover:scale-110 transition" />
            <p className="text-4xl font-extrabold">0</p>
            <p className="text-sm opacity-90 mt-1">Data Stored</p>
          </div>

        </div>
      </div>
    </section>
  );
}
