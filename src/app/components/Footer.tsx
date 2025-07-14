export default function Footer() {
  return (
    <footer className="mt-16 border-t text-center text-sm text-muted-foreground py-6 px-4">
      <p>
        &copy; {new Date().getFullYear()} MarketPlaceX. Built with ❤️ in
        Nigeria.
      </p>
      <div className="mt-2 space-x-4">
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a href="/terms" className="hover:underline">
          Terms
        </a>
      </div>
    </footer>
  );
}
