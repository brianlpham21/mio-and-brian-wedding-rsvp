'use client';

import { motion } from 'framer-motion';

const details = [
  {
    title: 'Dress Code',
    description:
      'Formal attire is requested. Gentlemen, please wear suits or dress shirts and ties. Ladies, dresses or formal evening wear are perfect.',
    icon: '👗',
  },
  {
    title: 'Parking & Transportation',
    description:
      'Complimentary parking is available at the venue. Rideshare is encouraged if you plan to enjoy drinks during the reception.',
    icon: '🚗',
  },
  {
    title: 'Accommodations',
    description:
      'We have reserved a room block at The Langham Hotel in Pasadena. Mention “Mio & Brian Wedding” when booking for the group rate.',
    icon: '🏨',
  },
  {
    title: 'Gifts',
    description:
      'Your presence means the world to us! For those who wish to give a gift, we are registered at Crate & Barrel and Zola.',
    icon: '🎁',
  },
];

export default function AdditionalDetails() {
  return (
    <section
      id="details"
      className="w-full bg-pastel-green-25 py-20 px-6 sm:px-8 md:px-12 text-gray-800"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-black"
          style={{ fontFamily: 'Brother, serif', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
        >
          Additional Details
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Here’s everything you might want to know to help plan your time with us.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {details.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm p-6 border border-pink-100 text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
