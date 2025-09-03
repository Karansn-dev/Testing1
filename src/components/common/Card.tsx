import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  hover = true,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  const baseClasses = 'bg-surface rounded-lg shadow-card';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverAnimation = hover ? {
    whileHover: { 
      y: -4,
      boxShadow: '0px 20px 40px -15px rgba(2, 12, 27, 0.9)'
    }
  } : {};

  return (
    <motion.div
      className={`${baseClasses} ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};
