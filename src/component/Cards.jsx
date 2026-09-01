import React from 'react'
import Tilt from 'react-parallax-tilt'

const cardsData = [
  {
    title: 'Smart Cold Storage',
    desc: 'Keep your crops fresh using intelligent temperature and humidity control for maximum shelf life.',
    icon: '🌡️',
    color: 'from-green-400 via-lime-400 to-yellow-300',
  },
  {
    title: 'Real-Time Monitoring',
    desc: 'Track your storage conditions 24/7 with our live monitoring dashboard and mobile alerts.',
    icon: '📊',
    color: 'from-blue-400 via-cyan-400 to-teal-300',
  },
  {
    title: 'Smart Market Insights',
    desc: 'Get real-time market data to decide the best time to sell your produce for maximum profit.',
    icon: '📈',
    color: 'from-pink-400 via-purple-400 to-indigo-400',
  },
  {
    title: 'Blockchain Security',
    desc: 'We ensure transparency and traceability using blockchain-backed records for every transaction.',
    icon: '🔗',
    color: 'from-yellow-400 via-orange-400 to-red-400',
  },
  {
    title: 'Farmer Community',
    desc: 'Join thousands of farmers sharing knowledge, deals, and opportunities in one secure platform.',
    icon: '🤝',
    color: 'from-violet-400 via-purple-400 to-pink-400',
  },
  {
    title: 'Eco-Friendly Storage',
    desc: 'Our energy-efficient systems reduce waste and carbon footprint — saving both money and the planet.',
    icon: '🌍',
    color: 'from-emerald-400 via-green-400 to-lime-300',
  },
]

const Cards = () => {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-8 max-w-6xl">
      {cardsData.map((card, index) => (
        <Tilt
          key={index}
          glareEnable={true}
          glareColor="white"
          glareMaxOpacity={0.2}
          scale={1.05}
          transitionSpeed={2500}
          className="rounded-2xl bg-gradient-to-b from-gray-800/40 to-gray-900/60 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[rgba(255,255,255,0.15)] transition-all duration-500"
        >
          <div className="p-6 flex flex-col justify-between h-full text-center text-white">
            <div className="text-6xl mb-4">{card.icon}</div>
            <h3
              className={`text-2xl font-bold mb-3 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
            >
              {card.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{card.desc}</p>
            <div className="mt-5">
              <button
                className={`px-5 py-2 rounded-xl text-black font-semibold bg-gradient-to-r ${card.color} hover:scale-105 transition-transform duration-300`}
              >
                Learn More
              </button>
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  )
}

export default Cards