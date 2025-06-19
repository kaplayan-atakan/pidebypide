import PreHeader from './PreHeader';
import MainHeader from './MainHeader';

export default function Header() {
  return (
    <header id="header" className="section-header">
      <PreHeader />
      <MainHeader />
    </header>
  );
}
