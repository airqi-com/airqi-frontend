import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CloudOff, Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const cloudVariants = {
    animate: {
      x: [-20, 20],
      rotate: [-5, 5],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        },
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="inline-block mb-8"
        >
          <CloudOff className="w-24 h-24 text-blue-500 mx-auto" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl font-bold text-gray-900 mb-4"
        >
          404
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 mb-8"
        >
          Oops! The air quality data you're looking for seems to have drifted away.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-gray-400 text-sm"
          >
            Try refreshing or navigating to a different page
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;