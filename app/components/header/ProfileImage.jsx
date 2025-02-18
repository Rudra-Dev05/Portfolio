import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/assets/assets';
import { memo } from 'react';

const ProfileImage = memo(() => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="relative group rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
        rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="relative rounded-2xl overflow-hidden border border-gray-200/30 dark:border-gray-700/50
        bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
        shadow-2xl hover:shadow-3xl transition-all duration-500">
        <Image
          src={assets.profile_img}
          alt="Rudradev - Data Scientist"
          width={400}
          height={400}
          className="w-full h-auto object-cover transform transition-transform duration-700
            group-hover:scale-105"
          priority
          loading="eager"
        />
        <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full 
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
          text-sm font-medium text-gray-800 dark:text-white
          shadow-lg transform transition-transform duration-500
          group-hover:scale-105">
          Hyderabad, IN
        </div>
      </div>
    </motion.div>
  );
});

ProfileImage.displayName = 'ProfileImage';
export default ProfileImage;
