import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import type { Route } from '../../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'TaskIO' },
    { name: 'description', content: 'Welcome to TaskIO!' },
  ];
}

const Homepage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <Link to="/sign-in">
        <Button className="bg-blue-500 text-white">Login</Button>
      </Link>
      <Link to="/sign-up">
        <Button variant="outline" className="bg-blue-500 text-white">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default Homepage;
