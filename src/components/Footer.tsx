import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-[#cccccc]">
              <li><Link href="/for-individuals" className="hover:text-white transition-colors">For Individuals</Link></li>
              <li><Link href="/for-teams" className="hover:text-white transition-colors">For Teams</Link></li>
              <li><Link href="/for-government" className="hover:text-white transition-colors">Government</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-[#cccccc]">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-[#cccccc]">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link></li>
              <li><Link href="/instructors" className="hover:text-white transition-colors">Instructors</Link></li>
              <li><Link href="/alliances" className="hover:text-white transition-colors">Alliances</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-[#cccccc]">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/podcast" className="hover:text-white transition-colors">The Cybrary Podcast</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333333] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">Cybrary</Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-[#cccccc]">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="text-center text-[#cccccc] text-sm mt-8">
            Cybrary, Inc.© {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

