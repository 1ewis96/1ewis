import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

export default function CryptoStats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    {
      title: "Global Market Cap",
      value: 2.4,
      unit: "Trillion",
      icon: DollarSign,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Daily Trading Volume",
      value: 98,
      unit: "Billion",
      icon: BarChart3,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Active Traders",
      value: 420,
      unit: "Million",
      icon: Users,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Annual Growth",
      value: 186,
      unit: "%",
      icon: TrendingUp,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="py-16"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <h2 className="text-3xl font-bold text-center mb-12">The Crypto Economy at a Glance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex flex-col items-center text-center hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`p-4 rounded-full ${stat.color} mb-4`}>
              <stat.icon size={24} />
            </div>
            <h3 className="text-lg text-gray-300 mb-2">{stat.title}</h3>
            <div className="text-3xl font-bold">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.unit === "Trillion" ? 1 : 0}
                  decimal="."
                />
              ) : (
                "0"
              )}
              <span className="ml-1">{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
