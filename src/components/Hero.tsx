import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-[#f8f9fa] py-20 lg:py-32" aria-label="Hero section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Cybersecurity Training that Tangibly Reduces Business Risk
          </h1>
          <p className="text-xl md:text-2xl text-[#666666] mb-8 max-w-3xl mx-auto">
            Cybrary&apos;s structured, hands-on cybersecurity training empowers professionals to better protect their organizations. With curated Career Paths, industry-aligned Certification Preparation Programs, and threat-informed training, we offer the best in the business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/start-learning"
              className="inline-block px-8 py-4 bg-[#0066cc] text-white rounded-lg font-semibold hover:bg-[#0052a3] transition-colors text-lg"
            >
              Start Learning for Free
            </Link>
            <Link 
              href="/for-business"
              className="inline-block px-8 py-4 bg-white text-[#0066cc] border-2 border-[#0066cc] rounded-lg font-semibold hover:bg-[#f0f7ff] transition-colors text-lg"
            >
              Cybrary for Business
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

