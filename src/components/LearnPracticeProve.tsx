export default function LearnPracticeProve() {
  const items = [
    {
      title: 'Learn',
      description: 'Study core concepts and get hands-on with key skills in cybersecurity courses and labs led by industry experts.',
      icon: '📚'
    },
    {
      title: 'Practice',
      description: 'Exercise your problem-solving and creative thinking skills with interactive labs and security-centric puzzles.',
      icon: '💪'
    },
    {
      title: 'Prove',
      description: 'Demonstrate your mastery of key topics in assessments and practice tests.',
      icon: '✅'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Learn. Practice. Prove.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="text-center p-8 bg-[#f8f9fa] rounded-lg">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{item.title}</h3>
              <p className="text-[#666666] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

