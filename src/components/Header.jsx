import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Offers', path: '/offers' },
        { name: 'Events', path: '/events' },

        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
            <div className="container mx-auto px-4 x">
                <div className={`mx-auto max-w-5xl flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 glass-panel ${isScrolled ? 'bg-black/80 shadow-lg border-white/10' : 'bg-black/20 border-white/5'}`}>
                    <Link to="/" className="text-2xl font-bold font-[Playfair_Display] text-white hover:scale-105 transition-transform">
                        Cafe<span className="text-cafe-brown">.</span>
                    </Link>

                    <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-cafe-brown' : 'text-gray-300 hover:text-white'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="hidden md:flex">
                        <Link to="/menu" className="bg-cafe-brown hover:bg-pizza-red text-white py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(198,124,78,0.5)]">
                            Order Now
                        </Link>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-t border-white/10 mt-2 p-4 flex flex-col gap-4 mx-4 rounded-2xl bg-black/90 pt-8 pb-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-gray-300 hover:text-white text-center"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="bg-cafe-brown hover:bg-pizza-red transition-colors rounded-full py-3 text-center text-white font-semibold mt-4">
                        Order Now
                    </Link>
                </div>
            )}
        </header>
    );
}
