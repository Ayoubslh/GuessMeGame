import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <div className="px-10">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
