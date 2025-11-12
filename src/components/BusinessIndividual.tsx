import Link from 'next/link';

export default function BusinessIndividual() {
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Business Card */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Cybrary for Business</h2>
            <p className="text-[#666666] mb-6 leading-relaxed">
              Upskill your team with Cybrary&apos;s suite of cybersecurity training and management tools, including hands-on Virtual Labs, role-aligned Career Paths, and personalized remediation. Request a demo and learn how Cybrary tailors our deep library of training to your team&apos;s unique needs.
            </p>
            <Link 
              href="/get-demo"
              className="inline-block px-6 py-3 bg-[#0066cc] text-white rounded-lg font-semibold hover:bg-[#0052a3] transition-colors"
            >
              Get a Demo
            </Link>
          </div>

          {/* Individual Card */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Cybrary for Individuals</h2>
            <p className="text-[#666666] mb-6 leading-relaxed">
              Stand out from the crowd and advance your career with Cybrary&apos;s role-aligned Career Paths, targeted Skill Paths, and best-in-class Certification Prep Paths.
            </p>
            <Link 
              href="/start-learning"
              className="inline-block px-6 py-3 bg-[#0066cc] text-white rounded-lg font-semibold hover:bg-[#0052a3] transition-colors"
            >
              Start Learning for Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

