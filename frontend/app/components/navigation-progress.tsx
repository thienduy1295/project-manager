import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router';

export const NavigationProgress = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === 'loading') {
      // Start progress animation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90; // Don't go to 100 until page loads
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Complete the progress when navigation is done
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 200);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  if (!navigation.state || progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-background/90 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500"
        style={{
          width: `${progress}%`,
          transition: 'width 0.2s ease-out',
          boxShadow: '0 0 6px rgba(59, 130, 246, 0.4)',
        }}
      />
    </div>
  );
};
