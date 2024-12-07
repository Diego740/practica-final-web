
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Creado por Diego Aranda Gómez &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
